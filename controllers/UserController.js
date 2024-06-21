"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = exports.updateUser = exports.register = exports.refreshToken = exports.logout = exports.login = exports.getUsers = exports.getUser = exports.getImage = exports.deleteUser = void 0;
require("core-js/modules/es.promise.js");
var _UserModel = _interopRequireDefault(require("../models/UserModel.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _sequelize = require("sequelize");
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body;
    const user = await _UserModel.default.findOne({
      where: {
        [_sequelize.Op.or]: [{
          username
        }, {
          email
        }]
      }
    });
    if (user) {
      return res.status(400).json({
        message: "Username or email already exists"
      });
    }
    const hashedPassword = await _bcrypt.default.hash(password, 10);
    await _UserModel.default.create({
      username,
      email,
      password: hashedPassword
    });
    res.status(201).json({
      message: "User created successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.register = register;
const login = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;
    const user = await _UserModel.default.findOne({
      where: {
        username
      }
    });
    if (!user) {
      return res.status(400).json({
        message: "Username not found"
      });
    }
    const isPasswordValid = await _bcrypt.default.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Password is incorrect"
      });
    }
    const accessToken = _jsonwebtoken.default.sign({
      id: user.id
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m"
    });
    const refreshToken = _jsonwebtoken.default.sign({
      id: user.id
    }, process.env.REFRESH_TOKEN_SECRET);
    user.refresh_token = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      path: "/"
    });
    res.json({
      accessToken
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.login = login;
const refreshToken = async (req, res) => {
  try {
    const {
      refreshToken
    } = req.cookies;
    if (!refreshToken) {
      return res.status(403).json({
        message: "User not authenticated"
      });
    }
    const user = await _UserModel.default.findOne({
      where: {
        refresh_token: refreshToken
      }
    });
    if (!user) {
      return res.status(403).json({
        message: "User not authenticated"
      });
    }
    const accessToken = _jsonwebtoken.default.sign({
      id: user.id
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m"
    });
    res.json({
      accessToken
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.refreshToken = refreshToken;
const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(403).json({
        message: "User not authenticated"
      });
    }
    const user = await _UserModel.default.findOne({
      where: {
        refresh_token: refreshToken
      }
    });
    if (!user) {
      return res.status(403).json({
        message: "User not authenticated"
      });
    }
    user.refresh_token = null;
    await user.save();
    res.clearCookie("refreshToken");
    res.json({
      message: "User logged out"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.logout = logout;
const getUsers = async (req, res) => {
  try {
    const users = await _UserModel.default.findAll({
      attributes: {
        exclude: ["password", "refresh_token"]
      }
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
  try {
    const user = await _UserModel.default.findByPk(req.params.id, {
      attributes: {
        exclude: ["password", "refresh_token"]
      }
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body;
    const user = await _UserModel.default.findByPk(req.params.id);
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = await _bcrypt.default.hash(password, 10);
    }
    await user.save();
    res.json({
      message: "User updated successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
  try {
    const user = await _UserModel.default.findByPk(req.params.id);
    await user.destroy();
    res.json({
      message: "User deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.deleteUser = deleteUser;
const uploadImage = async (req, res) => {
  try {
    const user = await _UserModel.default.findByPk(req.params.id);
    if (!user) return res.status(404).json({
      message: "User not found"
    });
    if (user.img_url) {
      _fs.default.unlink("./public/".concat(user.img_url), err => {
        if (err) {
          console.log(err);
        }
      });
    }
    if (req.files) {
      const img = req.files.img;
      const extFile = _path.default.extname(img.name).toLowerCase();
      const imgName = "".concat(user.username, "_profile").concat(extFile);
      await img.mv("./public/".concat(imgName));
      user.img_url = imgName;
      await user.save();
      res.json({
        message: "Image uploaded successfully"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.uploadImage = uploadImage;
const getImage = async (req, res) => {
  try {
    const user = await _UserModel.default.findByPk(req.params.id);
    if (user) {
      res.sendFile("".concat(process.cwd(), "/public/").concat(user.img_url));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.getImage = getImage;