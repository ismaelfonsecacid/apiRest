// postController.js

const Post = require("../models/post");
const { uploadToStorage, deleteFromStorage } = require('../utils/controllers');

function getPosts(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { created_at: "desc" },
  };

  Post.paginate({}, options, (error, postsStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al obtener los posts" });
    } else {
      res.status(200).send(postsStored);
    }
  });
}



async function createPost(req, res) {
  const post = new Post(req.body);

  try {
    if (req.file) {
      const fileName = await uploadToStorage(req.file);
      post.miniature = fileName;
    }
    const userStored = await post.save();
    res.status(200).send(userStored);
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Error en el proceso de usuario" });
  }
}

module.exports = {
  getPosts,
  createPost,
};
