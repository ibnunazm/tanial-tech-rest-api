"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTodo = exports.getTodosByUserAndDate = exports.getTodos = exports.getTodo = exports.deleteTodo = exports.createTodo = void 0;
require("core-js/modules/es.promise.js");
var _TodoModel = _interopRequireDefault(require("../models/TodoModel.js"));
var _sequelize = require("sequelize");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getTodos = async (req, res) => {
  try {
    const todos = await _TodoModel.default.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
exports.getTodos = getTodos;
const getTodo = async (req, res) => {
  try {
    const todo = await _TodoModel.default.findByPk(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
exports.getTodo = getTodo;
const createTodo = async (req, res) => {
  try {
    const {
      name,
      time,
      date,
      status,
      user_id
    } = req.body;
    const todo = await _TodoModel.default.create({
      name,
      time,
      date,
      status,
      user_id
    });
    res.status(201).json({
      message: "Todo created successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
exports.createTodo = createTodo;
const updateTodo = async (req, res) => {
  try {
    const {
      name,
      time,
      date,
      status,
      user_id
    } = req.body;
    await _TodoModel.default.update({
      name,
      time,
      date,
      status,
      user_id
    }, {
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: "Todo updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
  try {
    await _TodoModel.default.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: "Todo deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
exports.deleteTodo = deleteTodo;
const getTodosByUserAndDate = async (req, res) => {
  try {
    const todos = await _TodoModel.default.findAll({
      where: {
        user_id: req.params.user_id,
        date: req.params.date
      }
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
exports.getTodosByUserAndDate = getTodosByUserAndDate;