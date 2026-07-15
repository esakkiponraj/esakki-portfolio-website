const Education = require('../models/Education');
const createCrudController = require('./crudFactory');

module.exports = createCrudController(Education);
