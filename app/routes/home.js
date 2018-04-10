import Route from '@ember/routing/route';
import fetch from 'ember-fetch/ajax';
import ENV from '../config/environment';

export default Route.extend({
  async model() {
    return await fetch(`${ ENV.BASE_URL }/ajax/people`);
  },
});
