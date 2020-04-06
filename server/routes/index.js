const router = require('express').Router();

router.use('/gateways', require('./gateways'));
router.use('/devices', require('./devices'));

module.exports = router;