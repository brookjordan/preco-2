import SkylinkVideo from '../components/skylink-video';
import { get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default SkylinkVideo.extend({
  skylink: service(),

  classNames: ['video-container--self'],
  peer: alias('skylink.user'),

  actions: {
    shareScreen() {
      let skylink = get(this, 'skylink');
      let user = get(skylink, 'user');

      get(skylink, 'room').shareScreen();
      set(user, 'isSharingScreen', true);
    },

    stopSharingScreen() {
      let skylink = get(this, 'skylink');
      let user = get(skylink, 'user');

      get(skylink, 'room').stopScreen();
      set(user, 'isSharingScreen', false);
    },
  },
});
