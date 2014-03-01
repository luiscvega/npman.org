module.exports = function (args) {
  var execute = args.execute;
  var syncValidations = args.syncValidations;
  var asyncValidations = args.asyncValidations;

  function flow(attributes, callback) {
    var index = 0;
    var error = new Error("Outflow");
    error.messages = [];

    syncValidations.forEach(function (validation) {
      if (!validation.assertion(attributes)) {
        error.messages.push(validation.message);
      };
    });

    function nextAsyncValidation(err) {
      var asyncValidation = asyncValidations[index++];

      if (err) error.messages.push(err);

      if (!asyncValidation) {
        if (error.messages.length > 0) {
          return callback(error, null);
        } else {
          return execute(attributes, callback);
        };
      };

      try {
        asyncValidation(attributes, callback, nextAsyncValidation);
      } catch (e) {
        return callback(e);
      };
    };

    nextAsyncValidation();
  };

  flow.error = function (template) {
    return function (err, req, res, next) {
      if (err.toString() === "Error: Outflow") {
        return res.render(template, { errors: err.messages })
      };

      next(err);
    };
  };

  return flow;
};
