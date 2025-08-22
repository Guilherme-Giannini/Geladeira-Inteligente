const path = require('path');

exports.receiveScan = async (req, res, next) => {
  try {
 
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem enviada. Campo esperado: "image".' });
    }

  
    const userId = req.body?.user_id ?? null;

  
    const publicUrl = `/uploads/${req.file.filename}`;

    return res.status(201).json({
      message: 'Imagem recebida!',
      meta: { user_id: userId },
      file: {
        originalname: req.file.originalname,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path, 
        url: publicUrl,      
      },
  
    });
  } catch (err) {
    next(err);
  }
};