"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _database = _interopRequireDefault(require("./config/database.js"));
var _UserRoute = _interopRequireDefault(require("./routes/UserRoute.js"));
var _FieldRoute = _interopRequireDefault(require("./routes/FieldRoute.js"));
var _ArticleRoute = _interopRequireDefault(require("./routes/ArticleRoute.js"));
var _TodoRoute = _interopRequireDefault(require("./routes/TodoRoute.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_dotenv.default.config();
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use((0, _cookieParser.default)());
app.use(_express.default.json());
app.use((0, _expressFileupload.default)());
app.use(_express.default.static("public"));
app.use(_UserRoute.default);
app.use(_FieldRoute.default);
app.use(_ArticleRoute.default);
app.use(_TodoRoute.default);
_database.default.sync();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(process.env.PORT, () => {
  console.log("Server is running on port ".concat(process.env.PORT));
});