var error = require("./middleware/error");
var manual = require("./middleware/manual");
var package = require("./middleware/package");
var user = require("./middleware/user");
var signup = require("./middleware/signup");
var login = require("./middleware/login");

var express = require("express");
var path = require("path");
var app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.locals.pretty = true;

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({ secret: "some secret here" }));
app.use(express.static(path.join(__dirname, "public")));

app.use(user);

app.use("/signup", signup);
app.use("/login", login);

app.get("/logout", function (req, res) {
  req.session = null;
  res.redirect("/");
});

app.use("/package", package)

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/:name", function (req, res) {
  res.redirect("/package/" + req.params.name);
});

app.listen(3000);
