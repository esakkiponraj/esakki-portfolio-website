const asyncHandler = require('../utils/asyncHandler');
const cache = require('../utils/cache');

// Generates standard CRUD handlers for a given Mongoose model.
// Used by Project/Skill/Education/Experience/Achievement/Testimonial/Blog
// controllers with in-memory caching for sub-millisecond public response times.
function createCrudController(Model, sortField = 'order') {
  const modelName = Model.modelName || 'Resource';

  const getAll = asyncHandler(async (req, res) => {
    const cacheKey = `${modelName}:all`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }
    const items = await Model.find().sort({ [sortField]: 1, createdAt: 1 }).lean();
    const result = { success: true, count: items.length, data: items };
    cache.set(cacheKey, result);
    res.json(result);
  });

  const getOne = asyncHandler(async (req, res) => {
    const cacheKey = `${modelName}:${req.params.id}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }
    const item = await Model.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    const result = { success: true, data: item };
    cache.set(cacheKey, result);
    res.json(result);
  });

  const create = asyncHandler(async (req, res) => {
    const item = await Model.create(req.body);
    cache.clear();
    res.status(201).json({ success: true, data: item });
  });

  const update = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    cache.clear();
    res.json({ success: true, data: item });
  });

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    cache.clear();
    res.json({ success: true, message: 'Deleted successfully' });
  });

  return { getAll, getOne, create, update, remove };
}

module.exports = createCrudController;
