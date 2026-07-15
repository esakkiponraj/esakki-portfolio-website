const Achievement = require('../models/Achievement');
const createCrudController = require('./crudFactory');

module.exports = createCrudController(Achievement);
