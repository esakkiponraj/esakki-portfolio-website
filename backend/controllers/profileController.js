const Profile = require('../models/Profile');
const asyncHandler = require('../utils/asyncHandler');
const cache = require('../utils/cache');

// GET /api/profile — public. Creates a default profile on first request
// if none exists yet, so the frontend never gets a 404.
const getProfile = asyncHandler(async (req, res) => {
  const cached = cache.get('profile');
  if (cached) {
    return res.json(cached);
  }
  let profile = await Profile.findOne().lean();
  if (!profile) {
    profile = await Profile.create({
      name: 'Esakki Ponraj M',
      title: 'Full Stack Developer',
      email: 'mesakkiponraj@gmail.com',
      summary: 'Full Stack Developer with practical experience in Next.js, React.js, Node.js, PostgreSQL, and MongoDB.',
      taglines: ['Full Stack Developer', 'MERN Stack Developer', 'React Developer', 'Backend Developer'],
    });
  }
  const result = { success: true, data: profile };
  cache.set('profile', result);
  res.json(result);
});

// PUT /api/profile — admin only
const updateProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create(req.body);
  } else {
    profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
      new: true,
      runValidators: true,
    });
  }
  cache.clear();
  res.json({ success: true, data: profile });
});

const path = require('path');
const fs = require('fs');

// GET /api/profile/resume — public download endpoint with forced PDF headers and proper filename
const downloadResumeFile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne().lean();
  const resumeUrl = profile?.resumeUrl;
  if (!resumeUrl) {
    return res.status(404).send('Resume not found');
  }

  // If stored in Cloudinary or another remote CDN, fetch and stream with proper PDF headers
  if (resumeUrl.startsWith('http://') || resumeUrl.startsWith('https://')) {
    const fetchRes = await fetch(resumeUrl);
    if (!fetchRes.ok) {
      return res.status(fetchRes.status).send('Failed to fetch resume file');
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Esakki_Ponraj_Resume.pdf"');
    const arrayBuffer = await fetchRes.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  }

  // Local file fallback
  const filePath = path.join(__dirname, '..', resumeUrl.replace(/^\//, ''));
  if (fs.existsSync(filePath)) {
    return res.download(filePath, 'Esakki_Ponraj_Resume.pdf');
  }

  return res.redirect(resumeUrl);
});

module.exports = { getProfile, updateProfile, downloadResumeFile };
