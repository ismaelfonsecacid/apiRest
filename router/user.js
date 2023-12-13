
const express = require("express")
const UserController = require("../controllers/user")
const md_auth = require("../middlewares/authenticated");


const api = express.Router();

api.get("/user/me",[md_auth.asureAuth],UserController.getMe)
api.get("/users",[md_auth.asureAuth],UserController.getUsers)
api.post("/user",[md_auth.asureAuth],UserController.createUser)



module.exports = api;