var encryptPassword = require("../encrypt-password");
var User = require("../../../user/model");

module.exports = function (attributes, callback) {
  var error;

  if (attributes.password.length < 8) {
    error = error || new Error("Outflow");
    if (error.messages) {
      error.messages.push("Password is too short.");
    } else {
      error.messages = ["Password is too short."];
    };
  };

  if (attributes.username.length == 0) {
    error = error || new Error("Outflow");
    if (error.messages) {
      error.messages.push("Username cannot be blank.");
    } else {
      error.messages = ["Username cannot be blank."];
    };
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
