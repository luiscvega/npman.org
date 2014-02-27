var express = require("express");
var app = module.exports = express(); 
var npm = require("../npm");
var manual = require("../manual");

app.all("/:name/:command?", function (req, res, next) {
  var name = req.params.name;

  model.findOne({ where: { name: name } }, function (err, data) {
    if (err) next(err);

    if (data) {
      req.package = data;
      next();
    } else {
      npm(name, function (err, data) {
        if (err) {
          res.render("no-package", { name: name });
        } else {
          var version = Object.keys(data)[0];
          var package = model({
            name: data[version].name,
            version: data[version]["dist-tags"].latest
          });

          package.save(function (err, data) {
            if (err) next(err);
            req.package = package;
            next();
          });
        };
      });
    };
  });
});

app.use(manual);

var model = exports.model = require("./model");
