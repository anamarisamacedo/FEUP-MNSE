const Statuses = {
  CREATED: 'Created',
  STARTED: 'Started',
  OVER: 'Over',
};

class Jam {
  constructor(leader, settings) {
    this.id = null;
    this.leader = leader;
    this.settings = settings;
    this.users = [leader];
    this.status = Statuses.CREATE;
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

Jam.Statuses = Statuses;
module.exports = Jam;
