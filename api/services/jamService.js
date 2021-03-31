const jamManager = require('../entities/jamManager');
const Jam = require('../entities/jam');

function createJam(leader, settings) {
  const jam = new Jam(leader, settings);
  jamManager.addJam(jam);

  return jam;
}

function joinJam(username, jamId) {
  jamManager.addUserToJam(username, jamId);
}

function leaveJam(username, jamId) {
  jamManager.removeUserFromJam(username, jamId);
}

module.exports = {
  createJam,
  joinJam,
  leaveJam,
};
