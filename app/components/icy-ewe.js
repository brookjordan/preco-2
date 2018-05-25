import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Component.extend({
  skylink: service(),

  togglePeerMuted(peerID) {
    let peer = get(this, 'skylink.peers').findBy('id', peerID);
    let peerMuted = get(peer, 'isMuted');
    set(peer, 'isMuted', !peerMuted);
  },

  togglePeerVisible(peerID) {
    let peer = get(this, 'skylink.peers').findBy('id', peerID);
    let peerVisible = get(peer, 'isVisible');
    set(peer, 'isVisible', !peerVisible);
  },

  togglePeerPrimary(peerID) {
    let peer = get(this, 'skylink.peers').findBy('id', peerID);
    let peerPrimary = get(peer, 'isPrimary');
    set(peer, 'isPrimary', !peerPrimary);
  },

  actions: {
    togglePeerMuted(peerID) {
      this.togglePeerMuted(peerID);
    },

    togglePeerVisible(peerID) {
      this.togglePeerVisible(peerID);
    },

    togglePeerPrimary(peerID) {
      this.togglePeerPrimary(peerID);
    },
  },
});
