const SocialLink = require('../models/SocialLink');
const createCrudController = require('./crudFactory');

module.exports = createCrudController(SocialLink, 'platform');
