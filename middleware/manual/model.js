var Schema = require("jugglingdb").Schema;
var schema = new Schema("redis", { port: 6379 });

module.exports = schema.define("Manual", {
  name: { type: String, index: true },
  content: String
});

