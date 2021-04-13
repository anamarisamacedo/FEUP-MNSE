const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
const { nanoid } = require('nanoid');
const Jam = require('./jam');
const JamNotFoundError = require('../errors/JamNotFoundError');
const JamAlreadyOverError = require('../errors/JamAlreadyOverError');
const { Statuses } = require('./jam');

function startServer() {
  const port = 3001;

  io.on('connection', (client) => {
    console.log('client connected');
    client.on('disconnect', () => { console.log('client disconnected'); });
  });

  io.listen(port);

  console.log(`Jam It! Server running on port ${port}`);
}

class JamManager {
  constructor() {
    this.jams = [];

    startServer();
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

    console.log(this.jams);
  }

  removeUserFromJam(username, jamId) {
    const index = this.jams.findIndex((jam) => jam.id === jamId);

    this.jams[index].removeUser(username);

    console.log(this.jams);
  }
}

module.exports = new JamManager();
