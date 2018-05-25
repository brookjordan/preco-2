import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  role: attr('string'),
  email: attr('string'),
  thumb: attr('string'),
  personNotes: attr('string'),

  company: belongsTo('company'),
});
