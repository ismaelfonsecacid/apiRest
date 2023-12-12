const express = require('express');
const { API_VERSION } = require("./constants");
const app = express();

// Ruta para mostrar un mensaje "Hola"
app.get('/', (req, res) => {
  res.send('Hola, pa cuando WORK ADRI');
});

module.exports = app;
