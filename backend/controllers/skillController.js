const Skill = require('../models/Skill');
const createCrudController = require('./crudFactory');

module.exports = createCrudController(Skill);
