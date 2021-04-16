const { withIndexes } = require('../utils/utils');

const Statuses = {
  CREATED: 'Created',
  STARTED: 'Started',
  OVER: 'Over',
};

class Jam {
  /**
   * Create a new Jam
   * @param {string} leader the username of the Jam Leader
   * @param {Object} settings the Jam's settings
   * @param {string} settings.title the Jam's title
   * @param {Number} settings.bpm BPM to be used during playback of the Jam
   * @param {Number} settings.measures number of measures
   * @param {Number} settings.turnDuration duration of each player turn (in seconds)
   * @param {string[]} settings.instruments array of instruments names that can be used
   */
  constructor(leader, settings) {
    this.id = null;
    this.leader = leader;
    this.settings = settings;
    this.users = [leader];
    this.status = Statuses.CREATED;
    this.turn = 0;
    this.gamePlan = null;
    // used to cancel turn notification scheduling if a player passes their turn
    this.timeout = null;
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

    this.gamePlan = plan;

    return plan;
  }

  /**
   * Returns information about the next turn
   * @returns the next turn or null if there are no turns left
   */
  nextTurn() {
    const turn = this.gamePlan[this.turn];
    const totalTurns = this.settings.measures * this.settings.instruments.length;

    if (this.turn < totalTurns) {
      this.turn += 1;
    } else return null;

    console.log(this.turn);

    return turn;
  }
}

Jam.Statuses = Statuses;
module.exports = Jam;
