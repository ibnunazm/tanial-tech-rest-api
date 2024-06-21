"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _TodoController = require("../controllers/TodoController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.get('/todos', _VerifyToken.verifyToken, _TodoController.getTodos);
router.get('/todo/:id', _VerifyToken.verifyToken, _TodoController.getTodo);
router.post('/todo', _VerifyToken.verifyToken, _TodoController.createTodo);
router.put('/todo/:id', _VerifyToken.verifyToken, _TodoController.updateTodo);
router.delete('/todo/:id', _VerifyToken.verifyToken, _TodoController.deleteTodo);
router.get('/todos/user/:user_id/date/:date', _VerifyToken.verifyToken, _TodoController.getTodosByUserAndDate);
var _default = exports.default = router;