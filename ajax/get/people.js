let getBuilder = require('../get-builder');

const BLACKLIST_ATTRIBUTES = [
  'id',
  'uuid',
  'password',
  'display',
  'admin',
  'super_admin',
  'authenticator',
];

module.exports = getBuilder('people', {
  BLACKLIST_ATTRIBUTES,
});
