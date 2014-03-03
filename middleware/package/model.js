var Schema = require("jugglingdb").Schema;
var schema = new Schema("redis", { port: 6379 });

var Version = require("./../version/model");

var Package = schema.define("Package", {
  name: { type: String, index: true },
  author: String,
  maintainer: String
});

Package.hasMany(Version, { as: "versions", foreignKey: "packageId" });

module.exports = Package;
