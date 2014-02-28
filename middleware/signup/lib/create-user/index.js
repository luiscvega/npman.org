var encryptPassword = require("../encrypt-password");
var User = require("../../../user/model");

var createUser = function (attributes, callback) {
  var error = new Error("Outflow");
  error.messages = []

  if (attributes.password.length < 8) {
    error.messages.push("Password is too short.");
  };

  if (attributes.username.length == 0) {
    error.messages.push("Username cannot be blank.");
  };

  if (error) {
    return callback(error, null);
  };

  encryptPassword(attributes, function (err, attributes) {
    User(attributes).save(function (err, data) {
      callback(null, data);
    });
  });
};

createUser.error = function (template) {
  return function (err, req, res, next) {
    if (err.toString() === "Error: Outflow") {
      return res.render(template, { errors: err.messages })
    };

    next(err);
  }
};

module.exports = createUser;
