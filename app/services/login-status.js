import Service, { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Service.extend({
  modalOpen: false,
  isLoggedIn: readOnly('user.isLoggedIn'),
  user: service(),
  toggleModal() {
    this.toggleProperty('modalOpen');
  },
});
