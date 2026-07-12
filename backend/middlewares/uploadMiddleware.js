const multer = require('multer');

// Files are held in memory, then either pushed to Cloudinary or
// written to /uploads locally — see controllers/uploadController.js
const storage = multer.memoryStorage();

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const allowedDocTypes = ['application/pdf'];

function fileFilter(req, file, cb) {
  const allowed = [...allowedImageTypes, ...allowedDocTypes];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type. Allowed: JPEG, PNG, WEBP, GIF, PDF'), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

module.exports = upload;
