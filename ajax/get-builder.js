let JsonAPI = require('./json-api');
let getData = require('./get-data');

module.exports = (type) => {
  return async (req, resp) => {
    if (req.params && req.params.id) {
      let entry = await getData(type, req.params.id);

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
      let data = await getData.byType(type);
      resp.status(200);
      resp.send({
        data: JsonAPI.toJSON(type, data),
      });
    }
  };
};
