import { io } from 'socket.io-client';

class Connection {
  constructor(username, jamId) {
    this.username = username;
    this.jamId = jamId;

    this.start(username, jamId);
  }

  start(username, jamId) {
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
