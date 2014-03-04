var express = require("express");
var app = module.exports = express(); 
var md = require("marked");
var npm = require("npm");

app.set("views", __dirname + "/views");
app.locals.pretty = true;

app.all("/:name/:command?", function (req, res, next) {
  var package = req.package;

  model.findOne({ where: { name: package.name } }, function  (err, data) {
    if (err) next(err); 
    req.manual = data;
    next();
  });
});

app.get("/:name", function (req, res) {
  var package = req.package;

  package.versions(function (err, versions) {
    res.render("show", {
      package: package,
      versions: versions,
      manual: req.manual,
      md: md
    });
  });
});

app.post("/:name", function (req, res) {
  var manual = model(req.body.manual);

  manual.save(function (err, data) {
    res.redirect("/package/" + data.name);
  });
});

app.put("/:name", function (req, res) {
  var content = req.body.manual.content;
  var manual = req.manual;

  manual.content = content;
  manual.save(function (err, data) {
    res.redirect("/package/" + data.name);
  });
});

app.get("/:name/new", function (req, res) {
  res.render("new", { package: req.package });
});

app.get("/:name/edit", function (req, res) {
  res.render("edit", { package: req.package, manual: req.manual });
});

var model = exports.model = require("./model");
