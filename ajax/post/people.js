let postBuilder = require('../post-builder');

const WHITELIST_ATTRIBUTES = [
  'name',
  'notes',
];

module.exports = postBuilder('people', {
  WHITELIST_ATTRIBUTES,
});
