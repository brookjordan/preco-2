let db = require('./db');
let Inflector = require('inflector-js');

module.exports = function(typeMultiple, {
  WHITELIST_ATTRIBUTES = [],
} = {}) {
  let type = Inflector.singularize(typeMultiple);

  return function(req, res, next) {
    let attributes = {};
    WHITELIST_ATTRIBUTES.reduce((acc, key) => {
      if (req.body.data.attributes[key]) {
        acc[key] = req.body.data.attributes[key];
      }
      return acc;
    }, {});

    res.send({
      data: {
        attributes,
        type: typeMultiple,
        id: ('' + Math.random()).slice(2),
      },
    });
  };
};
