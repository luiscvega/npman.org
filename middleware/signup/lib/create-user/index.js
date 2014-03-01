var outflow = require("./outflow");
var encryptPassword = require("../encrypt-password");
var User = require("../../../user/model");

module.exports = outflow({
  asyncValidations: [
    {
      assertion: function (attributes, callback, next) {
        User.findOne({ where: { username: attributes.username } }, function (err, data) {
          if (err) return callback(err);

          if (data) {
            // user exists!
            // then we want to error
            next("User already exists");
          } else {
            next();
            // user does not exist!
            // then we should just continue without errors
          };
        });
      }
    }
  ],

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
