import SkylinkVideo from '../components/skylink-video';
import { get, set } from '@ember/object';
import { addObserver } from '@ember/object/observers';

export default SkylinkVideo.extend({
  didInsertElement() {
    this._super(...arguments);
    addObserver(get(this, 'peer'), 'isMuted', this, this.setElementMuted);
  },

  toggleMuted(to) {
    if (typeof to === 'boolean') {
      set(this, 'peer.isMuted', to);
    } else {
      this.toggleProperty('peer.isMuted');
    }
  },

  actions: {
    switchLevel() {
      set(this, 'peer.isPrimary', !get(this, 'peer.isPrimary'));
    },

    hideStream() {
      set(this, 'peer.isVisible', false);
    },

    toggleMuted(to) {
      this.toggleMuted(to);
    }
  },
});
