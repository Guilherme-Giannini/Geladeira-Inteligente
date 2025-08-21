const path = require('path');

exports.receiveScan = async (req, res, next) => {
  try {
    // O multer popula req.file quando o campo correto é enviado
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem enviada. Campo esperado: "image".' });
    }

    // (Opcional) pegar user_id enviado junto no form-data
    const userId = req.body?.user_id ?? null;

    // Monta uma URL pública caso você tenha habilitado app.use('/uploads', express.static(...))
    const publicUrl = `/uploads/${req.file.filename}`;

    return res.status(201).json({
      message: 'Imagem recebida!',
      meta: { user_id: userId },
      file: {
        originalname: req.file.originalname,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path, // caminho no servidor
        url: publicUrl,      // útil para visualizar a imagem
      },
      // TODO (próximos passos): chamar serviço de IA aqui e salvar resultado no banco
    });
  } catch (err) {
    next(err);
  }
};