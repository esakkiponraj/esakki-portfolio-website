const createCrudRouter = require('./crudRouteFactory');
const socialLinkController = require('../controllers/socialLinkController');

module.exports = createCrudRouter(socialLinkController);
