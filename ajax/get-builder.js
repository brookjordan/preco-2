let JsonAPI = require('./json-api');
let dbGet   = require('./db-get');

module.exports = (type) => {
  return async (req, resp) => {
    if (req.params && req.params.id) {
      let entry = await dbGet[type].byID(req.params.id);

      if (entry) {
        resp.status(200);
        resp.send({
          data: JsonAPI.toJSON(type, entry),
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
      let data = await dbGet[type].all({ limit: 20 });
      resp.status(200);
      resp.send({
        data: JsonAPI.toJSON(type, data),
      });
    }
  };
};
