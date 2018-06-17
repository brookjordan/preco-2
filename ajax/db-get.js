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

    byEmail(email) {
      return byEmail(modelType, email);
    },
  };

  return acc;
}, {});

module.exports = getFunctions;

async function byID(type, ID) {
  let keys = Object.keys(whitelists[type]);

  return db.select(...keys)
    .from(Pluralize.singular(type))
    .where('uuid', ID)
    .limit(1)
    .first();
}

async function byEmail(type, email) {
  let keys = Object.keys(whitelists[type]);

  return db.select(...keys)
    .from(type)
    .where('email', email)
    .limit(1)
    .first();
}

async function byType(type, limit = 20) {
  let keys = Object.keys(whitelists[type]);

  return db.select(...keys)
    .from(Pluralize.singular(type))
    .limit(limit);
}
