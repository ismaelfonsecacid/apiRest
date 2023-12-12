const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors")
const { API_VERSION } = require("./constants");
const app = express();

// Ruta para mostrar un mensaje "Hola"
app.get('/', (req, res) => {
  res.send('Hola, pa cuando WORK ADRI');
});


//Import rutas
const authRoutes = require("./router/auth")


//Configurar body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Configure static folder
app.use(express.static("uploads"));

//Configure CORS
app.use(cors());

//Configure routings
app.use(`/api/${API_VERSION}`,authRoutes)


module.exports = app;
