import Component from '@ember/component';
import { get, set } from '@ember/object';
import { addObserver } from '@ember/object/observers';

export default Component.extend({
  classNames: ['video-container'],

  didInsertElement() {
    this._super(...arguments);
    let peer = get(this, 'peer');
    set(this, 'videoElt', this.$('.video-container__video')[0]);

    this.setElementMuted(get(this, 'peer.isMuted'));

    if (get(peer, 'stream')) {
      this.attachStream();
    }
    addObserver(peer, 'stream', this, this.attachStream);
  },

  setElementMuted() {
    get(this, 'videoElt').muted = get(this, 'peer.isMuted');
  },

  attachStream() {
    if (get(this, 'peer.stream')) {
      attachMediaStream(
        get(this, 'videoElt'),
        get(this, 'peer.stream')
      );
    }
  },
});
