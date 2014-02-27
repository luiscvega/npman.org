var express = require("express");
var app = module.exports = express(); 
var md = require("marked");
var npm = require("npm");

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.bodyParser());
app.use(express.methodOverride());

app.post("/", function (req, res) {
  var manual = model(req.body.manual);
  manual.save(function (err, data) {
    res.redirect("/package/" + data.name);
  });
});

app.put("/", function (req, res) {
  var params = req.body;

  model.findOne({ where: { name: params.manual.name } }, function (err, manual) {
    manual.content = params.manual.content;
    manual.save(function (err, data) {
      res.redirect("/package/" + data.name);
    });
  });
});

app.get("/:name", function (req, res, next) {
  npm.load(function (err) {
    var name = req.params.name;

    npm.view(name, function (err, data) {
      if (err) {
        res.render("no-package", { name: name });
      } else {

        model.findOne({ where: { name: name } }, function (err, manual) {
          if (manual) {
            var version = Object.keys(data)[0];
            var info = data[version];

            res.render("show", {
              info: info,
              version: version,
              manual: manual,
              md: md
            });

          } else {
            res.render("no-manual", { name: name });
          };
        });
      };
    });
  });
});

app.get("/:name/new", function (req, res) {
  res.render("new", { name: req.params.name });
});

app.get("/:name/edit", function (req, res) {
  var name = req.params.name

  model.findOne({ where: { name: name } }, function (err, manual) {
    res.render("edit", { manual: manual });
  });
});

var model = exports.model = require("./model");
