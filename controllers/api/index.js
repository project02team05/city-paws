// ApI endpoints
const router = require('express').Router();

const apiRoutes = require('./api');


router.use('/api', apiRoutes);

// Alert or errors
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;