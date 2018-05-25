import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Route.extend({
  mainHeaderToggle:  service(),

  beforeModel() {
    this._super(...arguments);
    get(this, 'mainHeaderToggle').update({
      showAfter: '#main_title',
    });
  },

  model() {
    return RSVP.hash({
      people: this.get('store').query('person', {}),
      companies: this.get('store').query('company', {}),
    });
  },
});
