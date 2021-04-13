const router = require('express').Router();
const controller = require('../../controllers/jamController');

router.post('/', controller.createJam);
router.patch('/join/:jamId', controller.joinJam);
router.patch('/leave/:jamId', controller.leaveJam);
router.get('/start/:jamId', controller.startJam);

module.exports = router;
