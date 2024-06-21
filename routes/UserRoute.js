"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _UserController = require("../controllers/UserController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post('/register', _UserController.register);
router.post('/login', _UserController.login);
router.post('/logout', _UserController.logout);
router.post('/refresh-token', _UserController.refreshToken);
router.get('/users', _VerifyToken.verifyToken, _UserController.getUsers);
router.get('/user/:id', _VerifyToken.verifyToken, _UserController.getUser);
router.put('/user/:id', _VerifyToken.verifyToken, _UserController.updateUser);
router.delete('/user/:id', _VerifyToken.verifyToken, _UserController.deleteUser);
router.post('/user/upload-image/:id', _VerifyToken.verifyToken, _UserController.uploadImage);
router.get('/user/profile/:id', _VerifyToken.verifyToken, _UserController.getImage);
var _default = exports.default = router;