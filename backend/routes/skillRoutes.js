const createCrudRouter = require('./crudRouteFactory');
const skillController = require('../controllers/skillController');

module.exports = createCrudRouter(skillController);
