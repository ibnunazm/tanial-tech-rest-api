"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
const sequelize = new _sequelize.Sequelize("tanial-tech-db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+07:00"
});
sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
}).catch(err => {
  console.error("Unable to connect to the database:", err);
});
var _default = exports.default = sequelize;