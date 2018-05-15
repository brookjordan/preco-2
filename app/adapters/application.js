import DS from 'ember-data';

let host = window && window.document
  ? 'http://localhost:8080'
  : 'http://localhost:8080';

export default DS.JSONAPIAdapter.extend({
  // Application specific overrides go here
  host,
});
