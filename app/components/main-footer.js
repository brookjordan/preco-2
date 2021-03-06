import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  classNames: ['main-nav'],
  loginStatus: service(),
  isLoggedIn: readOnly('user.isLoggedIn'),
  actions: {
    toggleLoginModal() {
      get(this, 'loginStatus').toggleModal();
    },
    logOut() {
      get(this, 'user').toggleProperty('isLoggedIn');
    },
  },
});
