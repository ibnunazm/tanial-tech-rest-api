"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const User = _database.default.define("User", {
  username: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  img_url: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  refresh_token: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "users",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});
var _default = exports.default = User;