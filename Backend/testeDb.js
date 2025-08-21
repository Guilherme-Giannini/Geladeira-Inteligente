const db = require('./models/db');

async function testarConexao() {
  try {
    const [rows] = await db.query('SELECT NOW() AS agora');
    console.log('Conexão OK! Hora do servidor:', rows[0].agora);
  } catch (err) {
    console.error('Erro ao conectar no banco:', err);
  } finally {
    db.end();
  }
}

testarConexao();