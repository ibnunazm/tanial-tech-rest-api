"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _ArticleController = require("../controllers/ArticleController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.get('/articles', _VerifyToken.verifyToken, _ArticleController.getArticles);
router.get('/article/:id', _VerifyToken.verifyToken, _ArticleController.getArticle);
router.post('/article', _VerifyToken.verifyToken, _ArticleController.createArticle);
router.put('/article/:id', _VerifyToken.verifyToken, _ArticleController.updateArticle);
router.delete('/article/:id', _VerifyToken.verifyToken, _ArticleController.deleteArticle);
router.get('/articles/search', _VerifyToken.verifyToken, _ArticleController.searchArticles);
var _default = exports.default = router;