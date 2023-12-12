const express = require("express");
const AuthController = require("../controllers/auth")

const api = express.Router();

api.get("/auth/register", AuthController.register);

module.exports = api;