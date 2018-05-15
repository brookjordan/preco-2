import Service from '@ember/service';
import EmObject, { get, set } from '@ember/object';

const TEMASYS_WEB_SDK_API = '7b02872b-7253-48eb-9868-fc9c894c204b';

export default Service.extend({
  lamptibRoom: null,
  mediaAccessSuccess: false,
  peers: null,

  init() {
    this._super(...arguments);

    let lamptibRoom = new Skylink();
    let peers = A();

    lamptibRoom.on('mediaAccessSuccess', (stream) => {
      set(this, 'mediaAccessSuccess', true)
    });

    lamptibRoom.on('peerJoined', (peerId, peerInfo, isSelf) => {
      if(isSelf) return;

      get(this, 'peers').pushObject({
        id: peerId,
        autoplay: true,
        muted: true,
      });
    });

    set(this, 'lamptibRoom', lamptibRoom);
    set(this, 'peers', peers);
  },

  addVideo() {

  },
});
