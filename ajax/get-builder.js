let db = require('./db');
let Inflector = require('inflector-js');

module.exports = function(typeMultiple, {
  BLACKLIST_ATTRIBUTES = [],
} = {}) {
  let type = Inflector.singularize(typeMultiple);

  return async function(req, resp) {
    if (req.params && req.params.id) {
      let entry = await db.select('*').from(type).where('uuid', req.params.id).limit(1).first();
      if (entry) {
        resp.status(200);
        resp.send({
          data: dataize(typeMultiple, entry),
        });
      } else {
        resp.status(404);
        resp.send({
          errors: [
            {
              title: `No ${ type } found with ID "${ req.params.id }"`
            }
          ]
        });
      }
    } else {
      resp.status(200);
      resp.send({
        data: dataizeArray(typeMultiple, await db.select('*').from(type)),
      });
    }
  };

  function dataizeArray(type, entries) {
    return entries.map(entry => dataize(type, entry));
  }

  function dataize(type, entry) {
    return {
      type,
      id: entry.uuid || entry.id,
      attributes: Object.keys(entry).reduce((acc, key) => {
        if (BLACKLIST_ATTRIBUTES.includes(key)) { return acc; }
        acc[key] = entry[key];
        return acc;
      }, {}),
    }
  }
};
