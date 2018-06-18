import Component from '@ember/component';

export default Component.extend({
  classNames: ['modal-dialogue'],
  classNameBindings: ['isOpen:modal-dialogue--open'],
  isOpen: false,
  close() {},

  actions: {
    close() {
      this.close();
    },
  },
});
