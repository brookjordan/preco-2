import Service from '@ember/service';
import EmObject, { get, set } from '@ember/object';
import { filterBy, setDiff } from '@ember/object/computed';
import { A } from '@ember/array';
import isServer from '../utils/is-server';

const TEMASYS_WEB_SDK_API = '7b02872b-7253-48eb-9868-fc9c894c204b';
const DEBUG_MODE          = false;

export default Service.extend({
  room: null,
  peers: null,
  user: null,

  visiblePeers: filterBy('peers', 'isVisible'),
  primaryPeers: filterBy('visiblePeers', 'isPrimary'),
  secondaryPeers: setDiff('visiblePeers', 'primaryPeers'),

  showButtons: true,
  defaultMuted: true,

  init() {
    if (isServer) { return; }
    this._super(...arguments);

    let room = new Skylink();
    let peers = A();
    let user = EmObject.create({
      id: null,
      isSelf: true,
      isMuted: true,
      ready: false,
      stream: null,
    });
    set(this, 'room', room);
    set(this, 'peers', peers);
    set(this, 'user', user);

    AdapterJS.webRTCReady(() => {
      this.prepareRoomEvents(room, user);
      this.initialiseRoom(room);
    });
  },

  prepareRoomEvents(room, user) {
    room.setUserData({
      name: 'You',
    });

    room.on('mediaAccessSuccess', (stream, isScreensharing/*, isAudioFallback, streamId*/) => {
      if (isScreensharing) { return; }

      user.setProperties({
        stream,
        ready: true,
      });
    });

    room.on('peerJoined', (peerID, peerInfo, isSelf) => {
      if (isSelf) { return; }

      let peers = get(this, 'peers');
      let peer = EmObject.create({
        id: peerID,
        isPrimary: (peers.length === 0),
        isSelf: false,
        isMuted: get(this, 'defaultMuted'),
        ready: false,
        isVisible: true,
      });

      peers.pushObject(peer);
    });

    room.on('peerLeft', (peerID, peerInfo/*, isSelf*/) => {
      let peers = get(this, 'peers');
      let peer = peers.findBy('id', peerID);
      peers.removeObject(peer);
    });

    room.on('incomingStream', (peerID, stream, isSelf) => {
      if (isSelf) { return; }

      let peers = get(this, 'peers');
      let peer = peers.findBy('id', peerID);
      if (get(peer, 'ready')) {
        set(peer, 'stream', stream);
      } else {
        peer.setProperties({
          stream,
          ready: true,
        });
      }
    });
  },

  initialiseRoom(room) {
    // let queryParams = new URL(location.href).searchParams;
    // let defaultRoom = queryParams.get('room') || 'Preco Lobby';
    let defaultRoom = `Preco Lobby${ DEBUG_MODE ? '__DEBUG' : '' }`;

    room.init(
      {
        apiKey      : TEMASYS_WEB_SDK_API,
        defaultRoom : defaultRoom,
      },
      () => room.joinRoom(
        {
          audio : true,
          video : true,
        },
        (/*data*/) => {
          // let { error, errorCode, room } = data || {};
          // if (error) { console.log(error); }
          // textChat.init();
        }
      )
    );
  },

  // addVideo() {

  // },
});
