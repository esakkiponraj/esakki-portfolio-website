const Blog = require('../models/Blog');
const createCrudController = require('./crudFactory');

module.exports = createCrudController(Blog, 'createdAt');
