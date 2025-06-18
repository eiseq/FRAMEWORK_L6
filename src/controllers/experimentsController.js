const experimentsService = require('../services/experimentsService');

const getAllExperiments = async (req, res) => {
    const experiments = await experimentsService.getAllExperiments();
    res.json(experiments);
};

const getExperimentById = async (req, res) => {
    const { id } = req.params;
    const experiment = await experimentsService.getExperimentById(id);
    if (experiment) {
        res.json(experiment);
    } else {
        res.status(404).json({ error: 'Экспримент не найден' });
    }
};

const createExperiment = async (req, res) => {
    const newExperiment = await experimentsService.createExperiment(req.body);
    res.status(201).json(newExperiment);
};

const updateExperiment = async (req, res) => {
    const { id } = req.params;
    const updatedExperiment = await experimentsService.updateExperiment(id, req.body);
    if (updatedExperiment) {
        res.json(updatedExperiment);
    } else {
        res.status(404).json({ error: 'Экспримент не найден' });
    }
};

const patchExperiment = async (req, res) => {
    const { id } = req.params;
    const patchedExperiment = await experimentsService.patchExperiment(id, req.body);
    if (patchedExperiment) {
        res.json(patchedExperiment);
    } else {
        res.status(404).json({ error: 'Экспримент не найден' });
    }
};

const deleteExperiment = async (req, res) => {
    const { id } = req.params;
    const success = await experimentsService.deleteExperiment(id);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Экспримент не найден' });
    }
};

module.exports = {
    getAllExperiments,
    getExperimentById,
    createExperiment,
    updateExperiment,
    patchExperiment,
    deleteExperiment
};
