const Post = require("../models/post");
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



async function createPost(req, res){
    const post = new Post(req.body);
    post.created_at = new Date();

    try {
      console.log(req.file);
        if (req.file) {
          const fileName = await uploadToStorage(req.file);
          post.miniature = fileName;
        }
        const postStored = await post.save();
        res.status(200).send(postStored);
      } catch (error) {
        console.error(error);
        res.status(400).send({ msg: "Error en el proceso de post" });
      }


}








async function uploadToStorage(file) {
    return new Promise((resolve, reject) => {
      const fileName = `post/${Date.now()}_${file.originalname}`;
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
createPost
}