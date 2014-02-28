var express = require("express");
var app = module.exports = express(); 
var encryptPassword = require("./lib/encrypt-password");

var User = require("../user/model");

app.set("views", __dirname);

app.get("/", function (req, res) {
  res.render("signup");
});

app.post("/", function (req, res) {
  encryptPassword(req.body.user, function (err, params) {
    User(params).save(function (err, data) {
      if (err) return next(err);
      req.session.username = data.username;
      res.redirect("/");
    });
  });
});
