const router = require('express').Router();

const jam = require('./jam');

router.use('/jam', jam);

module.exports = router;
