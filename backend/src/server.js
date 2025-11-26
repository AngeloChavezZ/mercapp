// src/server.js
const express = require('express');
const cors = require('cors');
const productsRoutes = require('./routes/products.routes');
const categoriesRoutes = require('./routes/categories.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'MercApp API funcionando' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso no encontrado' });
});

app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
