const router = require('express').Router();
const controller = require('../../controllers/jamController');

router.post('/', controller.createJam);
router.put('/join/:id', controller.joinJam);
router.put('/leave/:id', controller.leaveJam);

module.exports = router;
