var express = require("express");
var app = module.exports = express(); 

var User = require("../user/model");

app.set("views", __dirname);

app.get("/", function (req, res) {
  res.render("login");
});

app.post("/", function (req, res) {
  User.findOne({ where: { username: req.body.username } }, function (err, data) {
    if (err) return next(err);

    if (data && data.password === req.body.password) {
      req.session.username = data.username;
      res.redirect("/");
    } else {
      res.render("login");
    };
  });
});
