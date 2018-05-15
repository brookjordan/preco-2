import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  skylink: service(),
  init() {
    this._super(...arguments);
    let a = this.get('skylink');
  },
});
