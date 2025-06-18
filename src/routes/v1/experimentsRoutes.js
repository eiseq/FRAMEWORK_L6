const Router = require('../../lib/router');
const router = new Router();
const experimentsController = require('../../controllers/experimentsController');

router.get('', experimentsController.getAllExperiments);
router.get('/:id', experimentsController.getExperimentById);
router.post('', experimentsController.createExperiment);
router.put('/:id', experimentsController.updateExperiment);
router.patch('/:id', experimentsController.patchExperiment);
router.delete('/:id', experimentsController.deleteExperiment);

module.exports = router.handle();