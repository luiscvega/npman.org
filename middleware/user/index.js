var express = require("express");
var app = module.exports = express(); 

var model = exports.model = require("./model");

app.use(function (req, res, next) {
  model.findOne({ where: { username: req.session.username } }, function (err, data) {
    if (err) return next(err);
    res.locals.user = req.user = data;
    next();
  });
});
