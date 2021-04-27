const router = require('express').Router();
const controller = require('../../controllers/jamController');

router.post('/', controller.createJam);
router.get('/find/:jamId', controller.findJam);
router.get('/start/:jamId', controller.startJam);
router.put('/settings/:jamId', controller.updateJamSettings);

module.exports = router;
