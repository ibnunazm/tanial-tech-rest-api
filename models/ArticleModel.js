"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Article = _database.default.define("Article", {
  title: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: _sequelize.DataTypes.TEXT,
    allowNull: false
  },
  img_url: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: "articles",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});
var _default = exports.default = Article;