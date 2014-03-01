var outflow = require("./outflow");
var encryptPassword = require("../encrypt-password");
var User = require("../../../user/model");

module.exports = outflow({
  validations: [
    {
      assertion: function (attributes) { return attributes.password.length > 8 },
      message: "Password is too short."
    },
    {
      assertion: function (attributes) { return attributes.username.length != 0 },
      message: "Username cannot be blank."
    }
  ],

  execute: function (attributes, callback) {
    encryptPassword(attributes, function (err, attributes) {
      User(attributes).save(function (err, data) {
        callback(null, data);
      });
    });
  }
});
