let Pluralize = require('pluralize');
let db = require('./db');
let whitelists = require('./whitelists');

const getFunctions = Object.keys(whitelists).reduce((acc, modelType) => {
  acc[modelType] = {
    get all() {
      return byType(modelType, Infinity);
    },

    all({
      limit = 20
    } = {}) {
      return byType(modelType, limit);
    },

    byID(ID) {
      return byID(modelType, ID);
    },

    byEmail(email, options) {
      return byEmail(modelType, email, options);
    },
  };

  return acc;
}, {});

module.exports = getFunctions;

async function byID(type, ID) {
  let err;
  let keys = Object.keys(whitelists[type]);
  let entry = await db.select(...keys)
    .from(Pluralize.singular(type))
    .where('uuid', ID)
    .limit(1)
    .first()
    .catch(e => { err = e; });

  return err || entry;
}

async function byEmail(type, email, { filter = true } = {}) {
  let err;
  let keys = Object.keys(whitelists[type]);
  let entry = await db.select(...(filter ? keys : ['*']))
    .from(Pluralize.singular(type))
    .where('email', email)
    .limit(1)
    .first()
    .catch(e => { err = e; });

  return err || entry;
}

async function byType(type, limit = 20) {
  let keys = Object.keys(whitelists[type]);

  return db.select(...keys)
    .from(Pluralize.singular(type))
    .limit(limit);
}
