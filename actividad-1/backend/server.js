// backend/server.js
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors()); // Permitit peticiones dedsde otro puerto de localhost

app.get('/info/:tema', (req, res) => {
  const tema = req.params.tema.replace(/-/g, ' ');
  res.json({ mensaje: `Información solicitada sobre ${tema}` });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Middleware para aceptar JSON
app.use(express.json());

// RUTA DE PRUEBA
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// RUTA PERSONALIZADA
app.get('/info/:tema', (req, res) => {
  const { tema } = req.params;
  res.json({ mensaje: `Información solicitada sobre ${tema}` });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
