const createCrudRouter = require('./crudRouteFactory');
const blogController = require('../controllers/blogController');

module.exports = createCrudRouter(blogController);
