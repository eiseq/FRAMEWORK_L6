const fs = require('fs').promises;
const path = require('path');

const dbPath = path.join(__dirname, './db.json');

const readDb = async () => {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
};

const writeDb = async (data) => {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
};

const getAll = async (collection) => {
    const data = await readDb();
    return data[collection] || [];
};

const getById = async (collection, id) => {
    const data = await readDb();
    return data[collection].find(item => item.id === parseInt(id));
};

const create = async (collection, item) => {
    const data = await readDb();
    const newItem = { id: data[collection].length + 1, ...item };
    data[collection].push(newItem);
    await writeDb(data);
    return newItem;
};

const update = async (collection, id, item) => {
    const data = await readDb();
    const index = data[collection].findIndex(i => i.id === parseInt(id));
    if (index !== -1) {
        data[collection][index] = { id: parseInt(id), ...item };
        await writeDb(data);
        return data[collection][index];
    }
    return null;
};

const patch = async (collection, id, item) => {
    const data = await readDb();
    const index = data[collection].findIndex(i => i.id === parseInt(id));
    if (index !== -1) {
        data[collection][index] = { ...data[collection][index], ...item };
        await writeDb(data);
        return data[collection][index];
    }
    return null;
};

const deleteItem = async (collection, id) => {
    const data = await readDb();
    const index = data[collection].findIndex(i => i.id === parseInt(id));
    if (index !== -1) {
        data[collection].splice(index, 1);
        await writeDb(data);
        return true;
    }
    return false;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    patch,
    delete: deleteItem
};