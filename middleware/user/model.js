var Schema = require("jugglingdb").Schema;
var schema = new Schema("redis", { port: 6379 });
var crypto = require("crypto");

var User = schema.define("User", {
  username: { type: String, index: true },
  email: { type: String, index: true },
  cryptedPassword: String
});

User.prototype.gravatar = function () {
  var gravatar = "https://secure.gravatar.com/avatar/" + crypto.createHash("md5").update(this.email).digest("hex") + ".jpg";
  return gravatar;
};

module.exports = User;
