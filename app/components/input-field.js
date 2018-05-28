import Component from '@ember/component';
import { computed, get, set } from '@ember/object';

export default Component.extend({
  classNames: ['input-field'],
  classNameBindings: [
    'isValid:input-field--valid',
    'isInvalid:input-field--invalid',
  ],
  wasBlurred: false,
  type: 'text',
  hideLabel: false,
  showValidation: true,
  inputID: computed(function() {
    return `input-field--${ window.Ember.uuid() }`;
  }),

  setValidity() {
    if (this.element.querySelector('.input-field__input').validity.valid) {
      this.setProperties({
        isValid:   true,
        isInvalid: false,
      });
    } else {
      this.setProperties({
        isValid:   false,
        isInvalid: true,
      });
    }
  },

  actions: {
    focusOut() {
      set(this, 'wasBlurred', true);
      this.setValidity();
    },

    keyUp() {
      if (get(this, 'wasBlurred')) {
        this.setValidity();
      }
    },
  },
});
