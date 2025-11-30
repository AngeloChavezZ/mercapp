const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./utils/db.js");
const productsRoutes = require("./routes/products.routes");
const categoriesRoutes = require("./routes/categories.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "MercApp API funcionando" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Recurso no encontrado" });
});

// Error general
app.use((err, req, res, next) => {
  console.error("Error no controlado:", err);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Conexión a la BD
connectDB();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
