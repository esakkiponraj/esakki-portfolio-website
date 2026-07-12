const Project = require('../models/Project');
const createCrudController = require('./crudFactory');

module.exports = createCrudController(Project);
