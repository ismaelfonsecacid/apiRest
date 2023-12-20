// userRoutes.js

const express = require('express');
const PostController = require('../controllers/post');
const md_auth = require('../middlewares/authenticated');
const multer = require('multer');
const router = express.Router();

// Declare multer storage once
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// Define your route with the multer middleware
router.post('/post', [md_auth.asureAuth, upload.single('miniature')], PostController.createPost);
router.get('/posts', PostController.getPosts);

module.exports = router;
