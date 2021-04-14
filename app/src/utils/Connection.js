import { io } from 'socket.io-client';

class Connection {
  constructor(username, jamId) {
    this.username = username;
    this.jamId = jamId;

    this.start(username, jamId);
  }

  start(username, jamId) {
    // TODO: get jamId from current URL and username from localStorage
    // TODO: connection should happen in the Jam Lobby instead
    this.socket = io('http://localhost:3001', {
      reconnection: false,
      query: {
        username,
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
