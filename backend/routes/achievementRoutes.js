const createCrudRouter = require('./crudRouteFactory');
const achievementController = require('../controllers/achievementController');

module.exports = createCrudRouter(achievementController);
