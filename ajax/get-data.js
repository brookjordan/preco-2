let Pluralize = require('pluralize');
let db = require('./db');
let whitelists = require('./whitelists');

module.exports = {
  byID,
  byType,
};

async function byID(type, id) {
  let keys = Object.keys(whitelists[type]);

  return db.select(...keys)
    .from(Pluralize.singular(type))
    .where('uuid', id)
    .limit(1)
    .first();
}

async function byType(type, limit = 20) {
  let keys = Object.keys(whitelists[type]);

  return db.select(...keys)
    .from(Pluralize.singular(type))
    .limit(limit);
}
