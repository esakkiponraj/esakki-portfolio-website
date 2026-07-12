const Testimonial = require('../models/Testimonial');
const createCrudController = require('./crudFactory');

module.exports = createCrudController(Testimonial);
