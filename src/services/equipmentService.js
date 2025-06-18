const db = require('../db/db');

const getAllEquipment = async () => {
    return await db.getAll('equipment');
};

const getEquipmentById = async (id) => {
    return await db.getById('equipment', id);
};

const createEquipment = async (equipment) => {
    return await db.create('equipment', equipment);
};

const updateEquipment = async (id, equipment) => {
    return await db.update('equipment', id, equipment);
};

const patchEquipment = async (id, equipment) => {
    return await db.patch('equipment', id, equipment);
};

const deleteEquipment = async (id) => {
    return await db.delete('equipment', id);
};

module.exports = {
    getAllEquipment,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    patchEquipment,
    deleteEquipment
};