class Jam {
  constructor(leader, settings) {
    this.id = null;
    this.leader = leader;
    this.settings = settings;
    this.users = [leader];
  }

  addUser(username) {
    if (!this.users.includes(username)) this.users.push(username);
  }

  removeUser(username) {
    const i = this.users.indexOf(username);

    if (i > -1) this.users.splice(i, 1);
  }

  changeSettings(settings) {
    this.settings = settings;
  }

  giveId(id) {
    this.id = id;
  }
}

module.exports = Jam;
