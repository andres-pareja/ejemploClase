const express = require('express');
const path = require('path');
const { calcular } = require('./operations');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/api/calcular', (req, res) => {
  const { operacion, a, b } = req.body;
  const numeroA = Number(a);
  const numeroB = Number(b);

  try {
    const resultado = calcular(operacion, numeroA, numeroB);
    res.json({ resultado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Calculadora Pixel corriendo en http://localhost:${PORT}`);
});
