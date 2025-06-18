const Router = require('../../lib/router');
const experimentRoutes = require('./experimentsRoutes');
const equipmentRoutes = require('./equipmentRoutes');

const router = new Router('/api/v1');

router.use(experimentRoutes, '/experiments');
router.use(equipmentRoutes, '/equipment');

router.get('', (req, res) => {
    res.json({
        version: 'v1',
        endpoints: [
            '/api/v1/experiments',
            '/api/v1/equipment'
        ],
        timestamp: new Date().toISOString()
    });
});

module.exports = router;