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
    this.connectedClients = [];

    this.socket = io(
      (server,
      {
        cors: {
          origin: 'http://localhost:3000',
        },
      }),
    );
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

      const index = this.jams.findIndex((jam) => jam.id === jamId);
      if (this.jams[index].leader !== username) {
        client.join(`${jamId}/guests`);
      }

      this.addUserToJam(username, jamId);
      this.connectedClients.push(client);

      client.on('disconnect', () => {
        this.removeUserFromJam(username, jamId);
        this.connectedClients.splice(this.connectedClients.indexOf(client), 1);

        console.log(`User ${username} left Jam ${jamId}`);
      });

      client.on('song-data', (song) => {
        console.log(`song-data: ${jamId}`);
        console.log(song);

        this.jams[index].song = song;

        // Share the song data with all players in the Jam
        this.socket.to(jamId).emit('song-data', song);

        this.notifyNextTurn(jamId);
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

    if (this.jams[index].status === Jam.Statuses.OVER) { throw new JamAlreadyOverError(); }

    this.jams[index].addUser(username);

    const users = this.listUsersInJam(jamId);
    this.socket.to(jamId).emit('current-users', users);
  }

  removeUserFromJam(username, jamId) {
    const index = this.jams.findIndex((jam) => jam.id === jamId);

    this.jams[index].removeUser(username);
    const users = this.listUsersInJam(jamId);
    this.socket.to(jamId).emit('current-users', users);
  }

  startJam(jamId) {
    const index = this.jams.findIndex((jam) => jam.id === jamId);

    if (index < 0) throw new JamNotFoundError();

    const jam = this.jams[index];
    jam.calculateGamePlan();

    if (jam.status === Jam.Statuses.OVER) throw new JamAlreadyOverError();

    jam.status = Statuses.STARTED;

    // Broadcast to users who have joined the jam that it has started
    this.socket.to(jamId).emit('start-jam');

    // Schedule next turn notifications for the jam
    this.notifyNextTurn(jam.id);

    this.jams[index] = jam;
  }

  listUsersInJam(jamId) {
    const index = this.jams.findIndex((jam) => jam.id === jamId);

    if (index < 0) return [];
    return this.jams[index].users;
  }

  notifyNextTurn(jamId) {
    const index = this.jams.findIndex((jam) => jam.id === jamId);
    const jam = this.jams[index];

    const nextTurn = jam.nextTurn(true);
    console.log(nextTurn);

    if (nextTurn) {
      jam.timeout = setTimeout(
        this.requestSongData.bind(this),
        jam.settings.turnDuration * 1000,
        jam,
        nextTurn.player,
      );

      this.socket.to(jam.id).emit('next-turn', nextTurn);
    } else {
      this.socket.to(jam.id).emit('jam-over');
      clearTimeout(jam.timeout);
    }

    this.jams[index] = jam;
  }

  requestSongData(jam, username) {
    this.socket.to(jam.id).emit('req-song-data', username);
  }

  findSocketByUser(username) {
    return this.connectedClients.find(
      (socket) => socket.handshake.query.username === username,
    );
  }

  updateJamSettings(jamId, settings) {
    const index = this.jams.findIndex((jam) => jam.id === jamId);

    if (index < 0) throw new JamNotFoundError();

    this.jams[index].settings = settings;

    this.socket.to(`${jamId}/guests`).emit('set-settings', settings);

    return this.jams[index];
  }

  findJamById(jamId) {
    const index = this.jams.findIndex((jam) => jam.id === jamId);

    if (index < 0) throw new JamNotFoundError();

    return this.jams[index];
  }
}

module.exports = new JamManager();
