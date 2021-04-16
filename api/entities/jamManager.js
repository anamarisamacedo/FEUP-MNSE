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

    const jam = this.jams[index];

    if (jam.status === Jam.Statuses.OVER) throw new JamAlreadyOverError();

    // Broadcast to users who have joined the jam that it has started
    this.socket.to(jamId).emit('start-jam');

    jam.status = Statuses.STARTED;

    // Schedule next turn notifications for the jam
    this.notifyNextTurn(jam);
    this.scheduleTurnNotifications(jam);

    this.jams[index] = jam;
  }

  listUsersInJam(jamId) {
    const index = this.jams.findIndex((jam) => jam.id === jamId);

    if (index < 0) return [];

    return this.jams[index].users;
  }

  notifyNextTurn(jam) {
    const nextTurn = jam.nextTurn(true);
    console.log(nextTurn);

    if (nextTurn) this.socket.to(jam.id).emit('next-turn', nextTurn);
    else {
      const index = this.jams.findIndex((j) => j.id === jam.id);
      clearInterval(this.jams[index].timeout);
    }
  }

  scheduleTurnNotifications(jam) {
    const index = this.jams.findIndex((j) => j.id === jam.id);

    this.jams[index].timeout = setInterval(
      this.notifyNextTurn.bind(this), jam.settings.turnDuration * 1000, jam,
    );
  }
}

module.exports = new JamManager();
