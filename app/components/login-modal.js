import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  loginStatus: service(),
  modalOpen: readOnly('loginStatus.modalOpen'),
  actions: {
    toggleModal() {
      get(this, 'loginStatus').toggleModal();
    },
  },
});
