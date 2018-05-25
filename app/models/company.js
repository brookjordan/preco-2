import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  city: attr('string'),
  name: attr('string'),
  image: attr('string'),
  notes: attr('string'),
  region: attr('string'),
  website: attr('string'),
  country: attr('string'),
  postcode: attr('string'),
  description: attr('string'),
  addressLine1: attr('string'),
  addressLine2: attr('string'),
  addressLine3: attr('string'),
  addressLine4: attr('string'),

  person: hasMany('person'),
});
