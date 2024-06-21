"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateArticle = exports.searchArticles = exports.getArticles = exports.getArticle = exports.deleteArticle = exports.createArticle = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _ArticleModel = _interopRequireDefault(require("../models/ArticleModel.js"));
var _sequelize = require("sequelize");
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createArticle = async (req, res) => {
  try {
    const {
      title,
      content
    } = req.body;
    const img = req.files.img;
    const article = await _ArticleModel.default.findOne({
      where: {
        title
      }
    });
    if (article) {
      return res.status(400).json({
        message: "Article title already exists"
      });
    }
    const imgName = "Article_".concat(title).concat(_path.default.extname(img.name));
    await img.mv("./public/".concat(imgName));
    await _ArticleModel.default.create({
      title,
      content,
      img_url: imgName,
      date: new Date()
    });
    res.status(201).json({
      message: "Article created successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.createArticle = createArticle;
const getArticles = async (req, res) => {
  try {
    const articles = await _ArticleModel.default.findAll();
    res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.getArticles = getArticles;
const getArticle = async (req, res) => {
  try {
    const article = await _ArticleModel.default.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({
        message: "Article not found"
      });
    }
    res.status(200).json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.getArticle = getArticle;
const updateArticle = async (req, res) => {
  try {
    const {
      title,
      content
    } = req.body;
    const img = req.files.img;
    const article = await _ArticleModel.default.findByPk(req.params.id);
    if (title) {
      article.title = title;
    }
    if (content) {
      article.content = content;
    }
    if (img) {
      const imgName = "Article_".concat(title).concat(_path.default.extname(img.name));
      if (article.img_url) {
        _fs.default.unlink("./public/".concat(article.img_url), err => {
          if (err) {
            console.log(err);
          }
        });
      }
      await img.mv("./public/".concat(imgName));
      article.img_url = imgName;
    }
    await article.save();
    res.json({
      message: "Article updated successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.updateArticle = updateArticle;
const deleteArticle = async (req, res) => {
  try {
    const article = await _ArticleModel.default.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({
        message: "Article not found"
      });
    }
    if (article.img_url) {
      _fs.default.unlink("./public/".concat(article.img_url), err => {
        if (err) {
          console.log(err);
        }
      });
    }
    await article.destroy();
    res.json({
      message: "Article deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.deleteArticle = deleteArticle;
const searchArticles = async (req, res) => {
  try {
    const {
      search
    } = req.query;
    const articles = await _ArticleModel.default.findAll({
      where: {
        title: {
          [_sequelize.Op.like]: "%".concat(search, "%")
        }
      }
    });
    res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.searchArticles = searchArticles;