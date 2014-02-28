var bcrypt = require("bcrypt");
var express = require("express");
var app = module.exports = express(); 

var User = require("../user/model");

app.set("views", __dirname);

app.get("/", function (req, res) {
  res.render("login");
});

app.post("/", function (req, res, next) {
  User.findOne({ where: { username: req.body.username } }, function (err, data) {
    if (err) return next(err);

    bcrypt.compare(req.body.password, data.cryptedPassword, function (err, success) {
      if (err) return next(err);

      if (success) {
        req.session.username = data.username;
        res.redirect("/");
      } else {
        res.render("login");
      };
    });
  });
});
