var express = require("express");
var app = module.exports = express(); 
var npm = require("./lib/npm");
var manual = require("../manual");

var model = exports.model = require("./model");

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.locals.pretty = true;


app.all("/:name/:command?", function (req, res, next) {
  // Step 1: Check if package with name and version exists
  model.findOne({ where: { name: req.params.name } }, function (err, data) {
    if (err) return next(err);
    req.package = data;
    next();
  });
});

app.all("/:name/:command?", function (req, res, next) {
  // Step 1-1: If it exists, set that as package then next
  if (req.package) return next();

  // Step 1-2: If it doesn't exists, fetch in npm and create package
  npm(name, function (err, data) {
    if (err) return res.render("no-package", { name: name });

    var version = Object.keys(data)[0];
    var info = data[version];
    var package = model({
      name: info.name,
        author: info.author,
        maintainer: info.maintainers,
        version: info["dist-tags"].latest
    });

    package.save(function (err, data) {
      if (err) return next(err);
      req.package = data;
      next();
    });
  });
});

app.use(manual);
