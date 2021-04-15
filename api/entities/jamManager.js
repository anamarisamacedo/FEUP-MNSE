const server = require('http').createServer();
const io = require('socket.io');
const { nanoid } = require('nanoid');
const Jam = require('./jam');
const JamNotFoundError = require('../errors/JamNotFoundError');
const JamAlreadyOverError = require('../errors/JamAlreadyOverError');
const { Statuses } = require('./jam');

class JamManager {
  constructor() {
    this.jams = [];

    this.socket = io((server, {
      cors: {
        origin: 'http://localhost:3000',
      },
    }));
  }

  startServer() {
    const port = 3001;

    this.socket.on('connection', (client) => {
      const { jamId, username } = client.handshake.query;

      // eslint-disable-next-line no-param-reassign
      client.username = username;

      // Add player to the Jam room
      client.join(jamId);
      console.log(`User ${username} joined Jam ${jamId}`);

      this.addUserToJam(username, jamId);

      client.on('disconnect', () => {
        this.removeUserFromJam(username, jamId);

        console.log(`User ${username} left Jam ${jamId}`);
      });
    });

    this.socket.listen(port);

    console.log(`Jam It! Server running on port ${port}`);
  }

  addJam(jam) {
    const id = nanoid(10);
    jam.giveId(id);

    this.jams.push(jam);

    console.log(this.jams);
  }

  addUserToJam(username, jamId) {
    const index = this.jams.findIndex((jam) => jam.id === jamId);

    if (index < 0) throw new JamNotFoundError();

    if (this.jams[index].status === Jam.Statuses.OVER) throw new JamAlreadyOverError();

    this.jams[index].addUser(username);
  }

  removeUserFromJam(username, jamId) {
    const index = this.jams.findIndex((jam) => jam.id === jamId);

    this.jams[index].removeUser(username);
  }

  startJam(jamId) {
    const index = this.jams.findIndex((jam) => jam.id === jamId);

    if (index < 0) throw new JamNotFoundError();

    if (this.jams[index].status === Jam.Statuses.OVER) throw new JamAlreadyOverError();

    // Broadcast to users who have joined the jam that it has started
    this.socket.to(jamId).emit('start-jam');

    this.jams[index].status = Statuses.STARTED;
  }

  listUsersInJam(jamId) {
    const index = this.jams.findIndex((jam) => jam.id === jamId);

    if (index < 0) return [];

    return this.jams[index].users;
  }
}

module.exports = new JamManager();
