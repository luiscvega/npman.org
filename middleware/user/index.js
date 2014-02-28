var express = require("express");
var app = module.exports = express(); 

var model = exports.model = require("./model");

app.use(function (req, res, next) {
  next();
});
