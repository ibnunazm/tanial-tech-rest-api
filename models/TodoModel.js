"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
var _UserModel = _interopRequireDefault(require("./UserModel.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Todo = _database.default.define("Todo", {
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: _sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  user_id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  }
});
Todo.belongsTo(_UserModel.default, {
  foreignKey: "user_id"
});
_UserModel.default.hasMany(Todo, {
  foreignKey: "user_id"
});
var _default = exports.default = Todo;