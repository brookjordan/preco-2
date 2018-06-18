import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import fetch from 'ember-fetch/ajax';

export default Component.extend({
  tagName: 'form',
  classNames: ['login-form'],
  loginStatus: service(),
  email: '',
  password: '',

  async submit(event) {
    event.preventDefault();
    let result = await fetch('/log-in', {
      method: 'POST',
      body: JSON.stringify({
        email: get(this, 'email'),
        password: get(this, 'password'),
      }),
      headers: {
        'content-type': 'application/json',
        //'Accept': 'application/json',
      },
    })
    .catch((result) => {
      console.log(result);
      return result.json();
    });

    if (result.errors) {
      set(get(this, 'loginStatus'), 'errors', result.errors);
      return;
    } else {
      set(get(this, 'loginStatus'), 'errors', null);
    }

    get(this, 'user').toggleProperty('isLoggedIn');
    get(this, 'loginStatus').toggleModal();
  },

  actions: {
    logIn() {
      alert('Logging in');
    },
  },
});
