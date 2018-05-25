let queryBuilder = require('../query-builder');

const BLACKLIST_ATTRIBUTES = [
  'id',
  'uuid',
  'display',
];

module.exports = queryBuilder('company', {
  BLACKLIST_ATTRIBUTES,
});
