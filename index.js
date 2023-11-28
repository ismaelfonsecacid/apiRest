const mongoose = require("mongoose");

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  API_VERSION,
  IP_SERVER,
} = require("./constants");

const connectDB = async () => {
    try {
      await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`)
  
      console.log('La conexión con la base de datos ha sido exitosa.');
    } catch (err) {
      console.log('Error al conectar a la base de datos', err);
    }
  }
  
  connectDB();