const jamService = require('../services/jamService');

function createJam(req, res) {
  const { leader, settings } = req.body;
  const jam = jamService.createJam(leader, settings);

  return res.status(201).json(jam);
}

function joinJam(username, jamId) {
  throw Error('Not implemented yet');
}

function leaveJam(username, jamId) {
  throw Error('Not implemented yet');
}

module.exports = {
  createJam,
  joinJam,
  leaveJam,
};
