var outflow = require("../../../../lib/outflow");
var encryptPassword = require("../encrypt-password");
var User = require("../../../user/model");

var createUser = outflow(function (attributes, callback) {
  encryptPassword(attributes, function (err, attributes) {
    if (err) return callback(err);

    User(attributes).save(function (err, data) {
      if (err) return callback(err);

      callback(null, data);
    });
  });
});

createUser.validateSync(function (attributes) {
  return attributes.username.length > 8;
}, "Password is too short.");

createUser.validateSync(function (attributes) {
  return attributes.email.length != 0;
}, "Email cannot be blank.");

createUser.validateSync(function (attributes) {
  return attributes.username.length != 0;
}, "Username cannot be blank.");

createUser.validate(function usernameUnique(attributes, callback, next) {
  User.findOne({ where: { username: attributes.username } }, function (err, data) {
    if (err) return callback(err);
    if (data) return next("Username is already taken.");
    next();
  });
});

createUser.validate(function emailUnique(attrs, done, next) {
  User.findOne({ where: { email: attrs.email } }, function (err, data) {
    if (err) return done(err);
    if (data) return next("Email is already taken.");
    next();
  });
});

module.exports = createUser;
