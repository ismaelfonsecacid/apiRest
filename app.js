const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");
const app = express();

// Ruta para mostrar un mensaje "Hola"
app.get("/", (req, res) => {
  res.send("PA CUANDO TRABAJO PORFABO");
});

//Import rutas
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");
const courseRoutes = require("./router/course");
const postRoutes = require("./router/post");

//Configurar body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure static folder
app.use(express.static("uploads"));

//Configure CORS
app.use(cors());

//Configure routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);

module.exports = app;
