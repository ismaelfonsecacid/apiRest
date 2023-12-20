const express = require('express');
const PostController = require('../controllers/post');
const md_auth = require("../middlewares/authenticated");
const api = express.Router();
const multer = require('multer');
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });


api.post("/post",[md_auth.asureAuth,upload.single('post')],PostController.createPost)



module.exports = api