import { io } from 'socket.io-client';

class Connection {
  constructor(username, picture, jamId) {
    this.username = username;
    this.jamId = jamId;
    this.picture = picture;

    this.start(username, picture, jamId);
  }

  start(username, picture, jamId) {
    this.socket = io('http://localhost:3001', {
      reconnection: false,
      query: {
        username,
        picture,
        jamId,
      },
    });

    this.socket.on('connect', () => {
      console.log('connected');
    });
  }

  end() {
    if (this.socket !== null) this.socket.disconnect();
  }
}

export default Connection;
