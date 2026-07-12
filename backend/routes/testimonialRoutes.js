const createCrudRouter = require('./crudRouteFactory');
const testimonialController = require('../controllers/testimonialController');

module.exports = createCrudRouter(testimonialController);
