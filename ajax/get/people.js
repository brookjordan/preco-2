let queryBuilder = require('../query-builder');

const BLACKLIST_ATTRIBUTES = [
  'id',
  'uuid',
  'password',
  'display',
  'admin',
  'super_admin',
  'authenticator',
];

module.exports = queryBuilder('person', {
  BLACKLIST_ATTRIBUTES,
});
