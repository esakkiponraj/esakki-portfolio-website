const createCrudRouter = require('./crudRouteFactory');
const educationController = require('../controllers/educationController');

module.exports = createCrudRouter(educationController);
