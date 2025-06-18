const Router = require('../../lib/router');
const router = new Router();
const equipmentController = require('../../controllers/equipmentController');

router.get('', equipmentController.getAllEquipment);
router.get('/:id', equipmentController.getEquipmentById);
router.post('', equipmentController.createEquipment);
router.put('/:id', equipmentController.updateEquipment);
router.patch('/:id', equipmentController.patchEquipment);
router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router.handle();
