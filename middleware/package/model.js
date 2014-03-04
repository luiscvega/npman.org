var Schema = require("jugglingdb").Schema;
var schema = new Schema("redis", { port: 6379 });

var Version = require("./../version/model");

var Package = schema.define("Package", {
  name: { type: String, index: true },
  author: String,
  maintainer: String
});

Package.hasMany(Version, { as: "versions", foreignKey: "packageId" });

Package.prototype.latestVersion = function (done) {
  this.versions(function (err, versions) {
   return done(null, versions[versions.length - 1]);
  });
};

module.exports = Package;
