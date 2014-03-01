var outflow = require("./outflow");
var encryptPassword = require("../encrypt-password");
var User = require("../../../user/model");

function userUnique(attributes, callback, next) {
  User.findOne({ where: { username: attributes.username } }, function (err, data) {
    if (err) return callback(err);
    if (data) return next("User already exists");
    next();
  });
};

module.exports = outflow({
  asyncValidations: [userUnique],
  syncValidations: [
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
