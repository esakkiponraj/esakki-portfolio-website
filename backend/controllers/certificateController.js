const Certificate = require('../models/Certificate');
const createCrudController = require('./crudFactory');

module.exports = createCrudController(Certificate);
