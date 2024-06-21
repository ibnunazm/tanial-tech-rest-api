"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateField = exports.searchFields = exports.getFieldsByUser = exports.getFields = exports.getField = exports.deleteField = exports.createField = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _FieldModel = _interopRequireDefault(require("../models/FieldModel.js"));
var _sequelize = require("sequelize");
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createField = async (req, res) => {
  try {
    const {
      user_id,
      name,
      code,
      size,
      planting_period
    } = req.body;
    const img = req.files.img;
    const field = await _FieldModel.default.findOne({
      where: {
        [_sequelize.Op.and]: [{
          user_id
        }, {
          code
        }]
      }
    });
    if (field) {
      return res.status(400).json({
        message: "Field code already exists"
      });
    }
    const imgName = "".concat(user_id, "_").concat(name).concat(_path.default.extname(img.name));
    await img.mv("./public/".concat(imgName));
    const harvest_time = new Date(Date.now() + planting_period * 24 * 60 * 60 * 1000);
    await _FieldModel.default.create({
      user_id,
      name,
      code,
      size,
      planting_period,
      harvest_time,
      img_url: imgName
    });
    res.status(201).json({
      message: "Field created successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.createField = createField;
const getFields = async (req, res) => {
  try {
    const fields = await _FieldModel.default.findAll();
    res.status(200).json(fields);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.getFields = getFields;
const getField = async (req, res) => {
  try {
    const field = await _FieldModel.default.findByPk(req.params.id);
    if (!field) {
      return res.status(404).json({
        message: "Field not found"
      });
    }
    res.status(200).json(field);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.getField = getField;
const updateField = async (req, res) => {
  try {
    const {
      name,
      code,
      size,
      planting_period
    } = req.body;
    const img = req.files.img;
    const field = await _FieldModel.default.findByPk(req.params.id);
    if (!field) {
      return res.status(404).json({
        message: "Field not found"
      });
    }
    if (field.img_url) {
      _fs.default.unlink("./public/".concat(field.img_url), err => {
        if (err) {
          console.log(err);
        }
      });
    }
    const imgName = "".concat(field.user_id, "_").concat(name).concat(_path.default.extname(img.name));
    await img.mv("./public/".concat(imgName));
    const harvest_time = new Date(Date.now() + planting_period * 24 * 60 * 60 * 1000);
    await field.update({
      name,
      code,
      size,
      planting_period,
      harvest_time,
      img_url: imgName
    });
    res.status(200).json({
      message: "Field updated successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.updateField = updateField;
const deleteField = async (req, res) => {
  try {
    const field = await _FieldModel.default.findByPk(req.params.id);
    if (!field) {
      return res.status(404).json({
        message: "Field not found"
      });
    }
    if (field.img_url) {
      _fs.default.unlink("./public/".concat(field.img_url), err => {
        if (err) {
          console.log(err);
        }
      });
    }
    await field.destroy();
    res.status(200).json({
      message: "Field deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.deleteField = deleteField;
const getFieldsByUser = async (req, res) => {
  try {
    const fields = await _FieldModel.default.findAll({
      where: {
        user_id: req.params.id
      }
    });
    res.status(200).json(fields);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.getFieldsByUser = getFieldsByUser;
const searchFields = async (req, res) => {
  try {
    const {
      user_id,
      search
    } = req.query;
    const fields = await _FieldModel.default.findAll({
      where: {
        user_id,
        name: {
          [_sequelize.Op.like]: "%".concat(search, "%")
        }
      }
    });
    res.status(200).json(fields);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.searchFields = searchFields;