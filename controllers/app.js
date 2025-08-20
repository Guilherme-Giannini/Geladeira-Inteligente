const express = require('express');
const cors = require('cors');
const itemsRoutes = require('./routes/itemsRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/items', itemsRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));