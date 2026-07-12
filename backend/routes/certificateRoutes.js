const createCrudRouter = require('./crudRouteFactory');
const certificateController = require('../controllers/certificateController');

module.exports = createCrudRouter(certificateController);
