let db = require('./db');

const DEFAULT_PARAMS = {
  BLACKLIST_ATTRIBUTES: [],
};

module.exports = function(type, {
  BLACKLIST_ATTRIBUTES,
} = DEFAULT_PARAMS) {
  return async function(req, resp) {
    if (req.params && req.params.id) {
      let person = await db.select('*').from(type).where('uuid', req.params.id).limit(1).first();
      if (person) {
        resp.status(200);
        resp.send({
          data: dataize(type, person),
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
        data: dataizeArray(type, await db.select('*').from(type)),
      });
    }
  };

  function dataizeArray(type, arr) {
    return arr.map(data => dataize(type, data));
  }

  function dataize(type, data) {
    return {
      type,
      id: data.uuid || data.id,
      attributes: Object.keys(data).reduce((acc, key) => {
        if (BLACKLIST_ATTRIBUTES.includes(key)) { return acc; }
        acc[key] = data[key];
        return acc;
      }, {}),
    }
  }
};
