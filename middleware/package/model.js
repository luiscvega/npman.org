var Schema = require("jugglingdb").Schema;
var schema = new Schema("redis", { port: 6379 });

module.exports = schema.define("Package", {
  name: { type: String, index: true },
  author: String,
  maintainer: String,
  version: String
});

