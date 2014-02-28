var Schema = require("jugglingdb").Schema;
var schema = new Schema("redis", { port: 6379 });

module.exports = schema.define("User", {
  username: { type: String, index: true },
  email: { type: String, index: true },
  cryptedPassword: String
});
