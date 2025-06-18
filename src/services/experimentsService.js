const db = require('../db/db');

const getAllExperiments = async () => {
    return await db.getAll('experiments');
};

const getExperimentById = async (id) => {
    return await db.getById('experiments', id);
};

const createExperiment = async (experiment) => {
    return await db.create('experiments', experiment);
};

const updateExperiment = async (id, experiment) => {
    return await db.update('experiments', id, experiment);
};

const patchExperiment = async (id, experiment) => {
    return await db.patch('experiments', id, experiment);
};

const deleteExperiment = async (id) => {
    return await db.delete('experiments', id);
};

module.exports = {
    getAllExperiments,
    getExperimentById,
    createExperiment,
    updateExperiment,
    patchExperiment,
    deleteExperiment
};