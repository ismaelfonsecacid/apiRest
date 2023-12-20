const { Storage } = require("@google-cloud/storage");
const dotenv = require('dotenv');
dotenv.config();

// Load Google Cloud Storage credentials
const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY
};

// Create Google Cloud Storage client
const storage = new Storage({
  projectId: "apirest-408512",
  credentials: credentials,
});

// Specify the bucket
const bucket = storage.bucket("apirest-isma");

async function uploadToStorage(file) {
  return new Promise((resolve, reject) => {
    const fileName = `avatar/${Date.now()}_${file.originalname}`;
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
  uploadToStorage,
  deleteFromStorage,
};
