var Schema = require("jugglingdb").Schema;
var schema = new Schema("redis", { port: 6379 });

var Package = require("./../package/model");

var Version = schema.define("Version", {
  packageId: { type: Number, index: true },
  number: { type: String, index: true }
});

Version.belongsTo(Package, { as: "package", foreignKey: "packageId" });

module.exports = Version;
