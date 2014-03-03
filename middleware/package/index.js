var express = require("express");
var app = module.exports = express(); 
var npm = require("./lib/npm");
var manual = require("../manual");

var Package = exports.model = require("./model");
var Version = require("./../version/model");

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.locals.pretty = true;


app.all("/:name/:command?", function (req, res, next) {
  Package.findOne({ where: { name: req.params.name } }, function (err, data) {
    if (err) return next(err);
    req.package = data;
    next();
  });
});

app.all("/:name/:command?", function (req, res, next) {
  if (req.package) return next();

  // Step 1-2: If it doesn't exists, fetch in npm and create package
  npm(req.params.name, function (err, data) {
    if (err) return res.render("no-package", { name: req.params.name });

    var versionNumber = Object.keys(data)[0];
    var info = data[versionNumber];
    var package = Package({
      name: info.name,
      author: info.author,
      maintainer: info.maintainers,
    });

    package.save(function (err, data) {
      if (err) return next(err);

      req.package = data;

      var version = Version({
        packageId: data.id,
        number: versionNumber
      });

      version.save(function (err, data) {
        if (err) return next(err);
        next();
      });
    });
  });
});

app.all("/:name/update", function (req, res, next) {
  npm(name, function (err, data) {
    var version = Object.keys(data)[0];

    if (req.package.version != version) {

    };
  });
});

app.use(manual);
