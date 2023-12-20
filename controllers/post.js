const Post = require("../models/post");
const image = require("../utils/image");
const { Storage } = require("@google-cloud/storage");
const dotenv = require('dotenv');
dotenv.config();
try {
  require('dotenv').config();
} catch (err) {
  console.error('Error cargando dotenv:', err);
}
const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY
};
const storage = new Storage({
  projectId: "apirest-408512", // Reemplaza con el ID de tu proyecto
  credentials: credentials,
});
const bucket = storage.bucket("apirest-isma"); // Reemplaza con el nombre de tu cubo
const multer = require("multer");
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });


async function createPost(req, res) {
  const post = new Post(req.body);

  try {
    if (req.file) {
      const fileName = await uploadToStorage(req.file);
      post.miniature = fileName;
    }
    post.created_at = new Date();
    const postStored = await post.save();
    res.status(201).send(postStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al crear el post" });
  }
}

async function getPosts(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { created_at: "desc" },
    };

    const postsStored = await Post.paginate({}, options);
    res.status(200).send(postsStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener los posts" });
  }
}

async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const postData = req.body;

    if (req.files.miniature) {
      const imagePath = image.getFileName(req.files.miniature);
      postData.miniature = imagePath;
    }

    await Post.findByIdAndUpdate({ _id: id }, postData);
    res.status(200).send({ msg: "Actualización correcta" });
  } catch (error) {
    res.status(400).send({ msg: "Error al actualizar el post" });
  }
}

async function deletePost(req, res) {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).send({ msg: "Post eliminado" });
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar el post" });
  }
}

async function getPost(req, res) {
  try {
    const { path } = req.params;
    const postStored = await Post.findOne({ path });

    if (!postStored) {
      res.status(400).send({ msg: "No se ha encontrado ningun post" });
    } else {
      res.status(200).send(postStored);
    }
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}
async function uploadToStorage(file) {
  return new Promise((resolve, reject) => {
    const fileName = `blog/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on("error", (error) => {
      console.error(error);
      reject(new Error("Error al subir la imagen a Google Cloud Storage"));
    });

    stream.on("finish", () => {
      resolve(fileName);
    });

    stream.end(file.buffer);
  });
}

async function deleteFromStorage(fileName) {
  try {
    await bucket.file(fileName).delete();
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar la imagen de Google Cloud Storage");
  }
}
module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
};
