const fs = require('fs');
const path = require('path');
const asyncHandler = require('../utils/asyncHandler');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');

// Uploads a single file (image or resume PDF) via multipart/form-data,
// field name "file". Admin only.
//
// If Cloudinary credentials are set in .env, the file is uploaded there
// and a permanent secure_url is returned. Otherwise it falls back to
// saving the file locally under /uploads and returns a relative URL —
// fine for local development, but Cloudinary (or similar) is strongly
// recommended in production so files survive redeploys.
const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file provided' });
  }

  if (isCloudinaryConfigured) {
    const resourceType = req.file.mimetype === 'application/pdf' ? 'raw' : 'image';

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'portfolio', resource_type: resourceType },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    return res.json({ success: true, url: uploadResult.secure_url, provider: 'cloudinary' });
  }

  // Local fallback
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const filename = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '-')}`;
  fs.writeFileSync(path.join(uploadsDir, filename), req.file.buffer);

  res.json({
    success: true,
    url: `/uploads/${filename}`,
    provider: 'local',
  });
});

module.exports = { uploadFile };
