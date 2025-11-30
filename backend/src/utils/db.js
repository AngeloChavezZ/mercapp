const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ MONGO_URI no está definida. Revisa las variables de entorno.");
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
