let nextId = 1;

class JamManager {
  constructor() {
    this.jams = [];
  }

  addJam(jam) {
    jam.giveId(nextId);
    nextId += 1;

    this.jams.push(jam);

    console.log(this.jams);
  }

  addUserToJam(username, jamId) {
    const index = this.jams.findIndex((jam) => jam.id === jamId);

    this.jams[index].addUser(username);
  }

  removeUserFromJam(username, jamId) {
    const index = this.jams.findIndex((jam) => jam.id === jamId);

    this.jams[index].removeUser(username);
  }
}

module.exports = new JamManager();
