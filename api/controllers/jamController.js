const jamService = require('../services/jamService');
const JamNotFoundError = require('../errors/JamNotFoundError');
const JamAlreadyOverError = require('../errors/JamAlreadyOverError');
const ErrorMessage = require('../utils/ErrorMessage');

function createJam(req, res) {
  const { leader, settings } = req.body;
  const jam = jamService.createJam(leader, settings);

  return res.status(201).json(jam);
}

function joinJam(req, res) {
  const { jamId } = req.params;
  const { username } = req.body;

  try {
    jamService.joinJam(username, jamId);
  } catch (err) {
    if (err instanceof JamNotFoundError) return res.status(500).json(new ErrorMessage('Jam not found'));

    if (err instanceof JamAlreadyOverError) return res.status(500).json(new ErrorMessage('Jam already over'));

    return res.status(500).json(new ErrorMessage());
  }

  return res.status(204).end();
}

function leaveJam(req, res) {
  const { jamId } = req.params;
  const { username } = req.body;

  jamService.leaveJam(username, jamId);

  return res.status(204).end();
}

module.exports = {
  createJam,
  joinJam,
  leaveJam,
};
