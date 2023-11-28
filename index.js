const mongoose = require("mongoose");
const app = require("./app");

const { DB_USER, DB_PASSWORD, DB_HOST, API_VERSION, IP_SERVER } = require("./constants");

const PORT = process.env.PORT || 4569;


const connectDB = async () => {
    try {
      await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`)
  
      console.log('La conexión con la base de datos ha sido exitosa.');
    } catch (err) {
      console.log('Error al conectar a la base de datos', err);
    }
  }
  
  // Lanzar la aplicación
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
  connectDB()