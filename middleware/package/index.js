var express = require("express");
var app = module.exports = express(); 
var npm = require("../../lib/npm");
var manual = require("../manual");

var model = exports.model = require("./model");

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.locals.pretty = true;

app.all("/:name/:command?", function (req, res, next) {
  var name = req.params.name;

  model.findOne({ where: { name: name } }, function (err, data) {
    if (err) return next(err);

    if (data) {
      req.package = data;
      return next();
    };

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
});

app.use(manual);
