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
    let store = window.store = this.get('store');

    return RSVP.hash({
      people: store.query('person', {}),
      companies: store.query('company', {}),
    });
  },
});
