import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  fullName: attr('string'),
  age: attr('number'),
  gender: attr('string'),
});
