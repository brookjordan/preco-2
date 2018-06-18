import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Component.extend({
  tagName: 'form',
  classNames: ['login-form'],
  loginStatus: service(),

  async submit(event) {
    event.preventDefault();
    get(this, 'user').toggleProperty('isLoggedIn');
    get(this, 'loginStatus').toggleModal();
  },

  actions: {
    logIn() {
      alert('Logging in');
    },
  },
});
