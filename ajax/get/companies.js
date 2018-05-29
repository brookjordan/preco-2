let getBuilder = require('../get-builder');

const BLACKLIST_ATTRIBUTES = [
  'id',
  'uuid',
  'display',
];

module.exports = getBuilder('companies', {
  BLACKLIST_ATTRIBUTES,
});
