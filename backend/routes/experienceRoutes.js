const createCrudRouter = require('./crudRouteFactory');
const experienceController = require('../controllers/experienceController');

module.exports = createCrudRouter(experienceController);
