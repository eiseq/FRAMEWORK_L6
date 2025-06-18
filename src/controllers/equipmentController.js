const equipmentService = require('../services/equipmentService');

const getAllEquipment = async (req, res) => {
    const equipment = await equipmentService.getAllEquipment();
    res.json(equipment);
};

const getEquipmentById = async (req, res) => {
    const { id } = req.params;
    const equipment = await equipmentService.getEquipmentById(id);
    if (equipment) {
        res.json(equipment);
    } else {
        res.status(404).json({ error: 'Оборудование не найдено' });
    }
};

const createEquipment = async (req, res) => {
    const newEquipment = await equipmentService.createEquipment(req.body);
    res.status(201).json(newEquipment);
};

const updateEquipment = async (req, res) => {
    const { id } = req.params;
    const updatedEquipment = await equipmentService.updateEquipment(id, req.body);
    if (updatedEquipment) {
        res.json(updatedEquipment);
    } else {
        res.status(404).json({ error: 'Оборудование не найдено' });
    }
};

const patchEquipment = async (req, res) => {
    const { id } = req.params;
    const patchedEquipment = await equipmentService.patchEquipment(id, req.body);
    if (patchedEquipment) {
        res.json(patchedEquipment);
    } else {
        res.status(404).json({ error: 'Оборудование не найдено' });
    }
};

const deleteEquipment = async (req, res) => {
    const { id } = req.params;
    const success = await equipmentService.deleteEquipment(id);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Оборудование не найдено' });
    }
};

module.exports = {
    getAllEquipment,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    patchEquipment,
    deleteEquipment
};