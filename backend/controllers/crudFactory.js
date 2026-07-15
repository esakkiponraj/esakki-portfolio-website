const asyncHandler = require('../utils/asyncHandler');

// Generates standard CRUD handlers for a given Mongoose model.
// Used by Project/Skill/Education/Experience/Achievement/Testimonial/Blog
// controllers so each resource gets consistent, tested behavior without
// duplicating the same logic ten times over.
function createCrudController(Model, sortField = 'order') {
  const getAll = asyncHandler(async (req, res) => {
    const items = await Model.find().sort({ [sortField]: 1, createdAt: 1 });
    res.json({ success: true, count: items.length, data: items });
  });

  const getOne = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: item });
  });

  const create = asyncHandler(async (req, res) => {
    const item = await Model.create(req.body);
    res.status(201).json({ success: true, data: item });
  });

  const update = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: item });
  });

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  });

  return { getAll, getOne, create, update, remove };
}

module.exports = createCrudController;
