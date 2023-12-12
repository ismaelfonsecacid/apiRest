const express = require('express');
const bodyParser = require("body-parser")
const { API_VERSION } = require("./constants");
const app = express();

// Ruta para mostrar un mensaje "Hola"
app.get('/', (req, res) => {
  res.send('Hola, pa cuando WORK ADRI');
});





//Configurar body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Configure static folder
app.use(express.static("uploads"));

module.exports = app;
