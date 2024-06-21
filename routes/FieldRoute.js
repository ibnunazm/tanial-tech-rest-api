"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _FieldController = require("../controllers/FieldController.js");
var _VerifyToken = require("../middlewares/VerifyToken.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.get("/fields", _VerifyToken.verifyToken, _FieldController.getFields);
router.get("/field/:id", _VerifyToken.verifyToken, _FieldController.getField);
router.post("/field", _VerifyToken.verifyToken, _FieldController.createField);
router.put("/field/:id", _VerifyToken.verifyToken, _FieldController.updateField);
router.delete("/field/:id", _VerifyToken.verifyToken, _FieldController.deleteField);
router.get("/fields/user/:id", _VerifyToken.verifyToken, _FieldController.getFieldsByUser);
router.get("/fields/search", _VerifyToken.verifyToken, _FieldController.searchFields);
var _default = exports.default = router;