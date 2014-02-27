var npm = require("npm");

module.exports = function (name, callback) {
  npm.load(function (err) {
    npm.view(name, function (err, data) {
      return callback(err, data);
    });
  });
}
