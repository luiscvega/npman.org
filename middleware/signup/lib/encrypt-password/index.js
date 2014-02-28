var bcrypt = require("bcrypt");

module.exports = function (params, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return callback(err);

    bcrypt.hash(params.password, salt, function (err, hash) {
      if (err) return callback(err);

      delete params.password;
      params.cryptedPassword = hash;

      callback(null, params);
    });
  });
};
