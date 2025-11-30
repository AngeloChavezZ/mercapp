const mongoose = require("mongoose");

const connectDB = async () => {
  // Mostrar qué variables relacionadas con Mongo llegan
  const mongoKeys = Object.keys(process.env).filter((k) =>
    k.toUpperCase().includes("MONGO")
  );
  console.log("🔎 Claves de entorno que contienen 'MONGO':", mongoKeys);
  console.log("🔎 Valores directos:",
    "MONGO_URI:", process.env.MONGO_URI,
    "MONGODB_URI:", process.env.MONGODB_URI,
    "MONGO_URL:", process.env.MONGO_URL
  );

  const uri =
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    process.env.MONGO_URL;

  if (!uri) {
    console.error(
      "❌ Ni MONGO_URI, ni MONGODB_URI ni MONGO_URL están definidas. Revisa las variables de entorno."
    );
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("📦 Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
  }
};

module.exports = connectDB;
