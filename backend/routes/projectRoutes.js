const createCrudRouter = require('./crudRouteFactory');
const projectController = require('../controllers/projectController');

module.exports = createCrudRouter(projectController);
