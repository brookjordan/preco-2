let postBuilder = require('../post-builder');

const WHITELIST_ATTRIBUTES = [
  'name',
  'notes',
];

module.exports = postBuilder('companies', {
  WHITELIST_ATTRIBUTES,
});
