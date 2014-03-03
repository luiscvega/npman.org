var createUser = require("./lib/create-user");
var express = require("express");
var app = module.exports = express(); 

app.set("views", __dirname);

app.get("/", function (req, res) {
  res.render("signup");
});

app.post("/", function (req, res, next) {
  createUser(req.body.user, function (err, user) {
    if (err) return next(err);
    req.session.username = user.username;
    res.redirect("/");
  });
});
app.use(createUser.error("signup"));
