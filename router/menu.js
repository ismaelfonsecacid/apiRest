const express = require("express");
const MenuController = require("../controllers/menu")
const md_auth = require("../middlewares/authenticated")

const api = express.Router();

api.post("/menu",[md_auth.asureAuth], MenuController.createMenu)
api.get("/menu",[md_auth.asureAuth], MenuController.getMenu)



module.exports = api;