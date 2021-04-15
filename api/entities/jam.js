const { withIndexes } = require('../utils/utils');

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
    this.status = Statuses.CREATED;
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

  /**
   * Calculates all player turns for the jam based on the number of players,
   * number of instruments and number of measures
   * @returns an array with each element containing the player, measure number and instrument
   */
  calculateGamePlan() {
    const plan = [];

    // Pre-calculate the total number of turns (among all players)
    const nTurns = this.settings.measures * this.settings.instruments.length;

    // Create copies of users and instruments array to avoid modifying the originals
    const users = this.users.slice();
    const instruments = withIndexes(this.settings.instruments.slice());
    let currMeasure = 0;

    for (let i = 0; i < nTurns; i += 1) {
      // Rotate users and instruments arrays
      const user = users.shift();
      users.push(user);
      const instrument = instruments.shift();
      instruments.push(instrument);

      plan.push({
        player: user,
        measure: currMeasure,
        instrument: instrument.elem,
      });

      if (instrument.index === instruments.length - 1) currMeasure += 1;
    }

    return plan;
  }
}

Jam.Statuses = Statuses;
module.exports = Jam;
