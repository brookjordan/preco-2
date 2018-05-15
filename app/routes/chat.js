import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Route.extend({
  mainHeaderToggle:  service(),

  activate() {
    this._super(...arguments);
    get(this, 'mainHeaderToggle').update({
      theme:       'dark',
    });
  },
});
