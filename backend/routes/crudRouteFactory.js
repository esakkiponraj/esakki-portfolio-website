const express = require('express');
const { protect } = require('../middlewares/authMiddleware');

// Builds standard REST routes for a CRUD controller:
// GET /       -> public   (list)
// GET /:id    -> public   (single)
// POST /      -> admin    (create)
// PUT /:id    -> admin    (update)
// DELETE /:id -> admin    (delete)
function createCrudRouter(controller) {
  const router = express.Router();

  router.get('/', controller.getAll);
  router.get('/:id', controller.getOne);
  router.post('/', protect, controller.create);
  router.put('/:id', protect, controller.update);
  router.delete('/:id', protect, controller.remove);

  return router;
}

module.exports = createCrudRouter;
