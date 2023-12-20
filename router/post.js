const express = require("express");
const api = express.Router();
const PostController = require("../controllers/post");
const md_auth = require("../middlewares/authenticated");

const multer = require('multer');
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

const multiparty = require("connect-multiparty");
const md_upload = multiparty({ uploadDir: "./uploads/blog" });

api.post("/post", [md_auth.asureAuth, upload.single('blog')], PostController.createPost);
api.get("/post", PostController.getPosts);
api.patch(
  "/post/:id",
  [md_auth.asureAuth, md_upload],
  PostController.updatePost
);
api.delete("/post/:id", [md_auth.asureAuth], PostController.deletePost);
api.get("/post/:path", PostController.getPost);

module.exports = api;

