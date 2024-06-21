"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
var _UserModel = _interopRequireDefault(require("./UserModel.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Field = _database.default.define("Field", {
  user_id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  planting_period: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  harvest_time: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  img_url: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "fields",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});
Field.belongsTo(_UserModel.default, {
  foreignKey: "user_id"
});
_UserModel.default.hasMany(Field, {
  foreignKey: "user_id"
});
var _default = exports.default = Field;