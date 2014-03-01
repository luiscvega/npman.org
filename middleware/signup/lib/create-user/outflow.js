module.exports = outflow;

function outflow(args) {
  var execute = args.execute;
  var syncValidations = args.syncValidations;
  var asyncValidations = args.asyncValidations;
  var error = new Error("Outflow");
  error.messages = [];

  function flow(attributes, callback) {
    var index = 0;
    syncValidations.forEach(function (validation) {
      if (!validation.assertion(attributes)) {
        error.messages.push(validation.message);
      };
    });

    function next(err) {
      var asyncValidation = asyncValidations[index++];

      if (err) {
        error.messages.push(err);
      };

      // all done
      if (!asyncValidation) {
        if (error.messages.length > 0) {
          return callback(error, null);
        } else {
          return execute(attributes, callback);
        };
      };

      try {
        asyncValidation.assertion(attributes, callback, next);
      } catch (e) {
        return callback(e);
      };
    };

    next();
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
