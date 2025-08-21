const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    // Nome seguro: timestamp + rand + extensão original
    const ts = Date.now();
    const rand = Math.random().toString(36).slice(2, 8);
    const safeOriginal = (file.originalname || 'image')
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9._-]/g, '');
    const ext = path.extname(safeOriginal) || '.jpg';
    cb(null, `${ts}-${rand}${ext}`);
  },
});

const allowed = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heif',
  'image/heic',
]);

function fileFilter(req, file, cb) {
  if (allowed.has(file.mimetype)) {
    cb(null, true);
  } else {
    const err = new Error('INVALID_FILE_TYPE');
    err.message = 'INVALID_FILE_TYPE'; // usado no app.js
    cb(err);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

module.exports = upload;