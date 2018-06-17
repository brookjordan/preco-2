let db = require('./db');
let Pluralize = require('pluralize');
let uuidv4 = require('uuid/v4');
let jsonAPI = require('./json-api');
let whitelist = require('./whitelist-object');
let whitelists = require('./whitelists');

module.exports = () => {
  return async (req, res, next) => {
    let data = req.body.data;

    if (!data || !data.type || !data.attributes) { throw noPayloadError(res); }

    let types = data.type;
    let type = Pluralize.singular(types);
    let uuid = uuidv4();
    let uuidObject = { uuid, table: type };
    let flatData = Object.assign(
      {
        uuid
      },
      whitelist(data.attributes, whitelists[types])
    );

    try {
      await db(type).insert(flatData);
    } catch(error) {
      return insertingDataError(res, error);
    }

    db('uuid').insert(uuidObject);
    res.status(200);
    let dataJsonAPI = jsonAPI.parse(type, flatData);
    delete dataJsonAPI.attributes;
    res.send({
      data: dataJsonAPI,
    });
  };
};

function noPayloadError(res) {
  let errorObject = {
    status: 400,
    title: 'No payload received',
    detail: 'Either no payload was passed or the payload was empty.',
  };

  res.status(400);
  res.send({
    errors: [errorObject],
  });
  return new Error(errorObject);
}

function insertingDataError(res, error) {
  let errorObject = {
    status: 502,
    title: 'Inserting data error',
    detail: `Either data was malformed or something went wrong on our side.\nFull error:\n${ error }`,
  };

  res.status(502);
  res.send({
    errors: [errorObject],
  });

  return Error(errorObject);
}
