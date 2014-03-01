module.exports = function (args) {
  var execute = args.execute;
  var validations = args.validations;
  var error = new Error("Outflow");
  error.messages = [];

  return function (attributes, callback) {
    validations.forEach(function (validation) {
      if (!validation.assertion(attributes)) {
        error.messages.push(validation.message);
      };
    });

    if (error.messages.length > 0) {
      return callback(error, null);
    };

    execute(attributes, callback);
  };
};
