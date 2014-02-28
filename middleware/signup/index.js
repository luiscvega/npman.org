var express = require("express");
var app = module.exports = express(); 

var User = require("../user/model");

app.set("views", __dirname);

app.get("/", function (req, res) {
  res.render("signup");
});

app.post("/", function (req, res) {
  var user = User(req.body.user);

  user.save(function (err, data) {
    if (err) return next(err);
    req.session.username = data.username;
    res.redirect("/");
  });
});

