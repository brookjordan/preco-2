import Service from '@ember/service';
import { get, set } from '@ember/object';
import { throttle, next as runNext } from '@ember/runloop';
import isServer from '../utils/is-server';

let boundSetVisibility;

export default Service.extend({
  isHidden: false,
  referenceElt: null,
  hideDynamically: false,

  init() {
    this._super(...arguments);
    boundSetVisibility = setVisibility.bind(this);
  },

  setVisibility() {
    if (isServer) { return; }

    let referenceEltSelector = get(this, 'referenceElt');
    let referenceElt = referenceEltSelector && document.querySelector(referenceEltSelector);

    if (referenceElt) {
      let referenceHeight = referenceElt.getBoundingClientRect().bottom;
      if (referenceHeight > 0) {
        set(this, 'isHidden', true);
        return;
      }
    }

    set(this, 'isHidden', false);
  },

  update({
    showAfter = false,
    theme     = null,
  } = {}) {
    if (isServer) { return; }

    let dynamicallyHide = !!showAfter;

    if (dynamicallyHide) {
      window.addEventListener('scroll', boundSetVisibility, true);
      window.addEventListener('resize', boundSetVisibility, true);
    } else {
      window.removeEventListener('scroll', boundSetVisibility);
      window.removeEventListener('resize', boundSetVisibility);
    }
    set(this, 'hideDynamically', !!showAfter);
    set(this, 'referenceElt', showAfter);
    runNext(boundSetVisibility);

    set(this, 'theme', theme);
  },
});

function setVisibility() {
  throttle(this, this.setVisibility, 100, false);
}
