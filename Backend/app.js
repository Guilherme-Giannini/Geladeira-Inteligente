require('dotenv').config();

const express = require('express');
const cors = require('cors');
const itemsRoutes = require('./routes/itemsRoutes');
const path = require('path');
const fs = require('fs');

const scanRoutes = require('./routes/scanRoutes');

const app = express();



app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });


app.use('/uploads', express.static(uploadsDir, { dotfiles: 'ignore' }));

app.use('/items', itemsRoutes);
app.use(scanRoutes);


app.use((err, req, res, next) => {
  if (err?.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ error: 'Imagem muito grande (máx 10MB).' });
    }
    return res.status(400).json({ error: 'Erro no upload', details: err.message });
  }
  if (err?.message === 'INVALID_FILE_TYPE') {
    return res.status(415).json({ error: 'Tipo de arquivo não suportado. Envie JPG, PNG, WEBP, HEIC/HEIF.' });
  }
  console.error(err);
  return res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});