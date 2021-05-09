const jamManager = require('../entities/jamManager');
const Jam = require('../entities/jam');

function createJam(leader, picture, settings) {
  const jam = new Jam(leader, picture, settings);
  jamManager.addJam(jam);

  return jam;
}

function joinJam(username, jamId) {
  jamManager.addUserToJam(username, jamId);
}

function leaveJam(username, jamId) {
  jamManager.removeUserFromJam(username, jamId);
}

function startJam(jamId) {
  jamManager.startJam(jamId);
}

function updateJamSettings(jamId, settings) {
  return jamManager.updateJamSettings(jamId, settings);
}

function findJam(jamId) {
  return jamManager.findJamById(jamId);
}

module.exports = {
  createJam,
  joinJam,
  leaveJam,
  startJam,
  updateJamSettings,
  findJam,
};
