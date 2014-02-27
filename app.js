var manual = require("./lib/manual");
var package = require("./lib/package");
var express = require("express");
var path = require("path");
var app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "jade");

app.use(express.static(path.join(__dirname, "public")));

app.use("/package", package)

app.get("/", function (req, res) {
  res.render("index");
});

app.listen(3000);
