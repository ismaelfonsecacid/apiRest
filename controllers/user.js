const User = require("../models/user");
const bcrypt = require("bcryptjs");
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



async function getMe(req, res) {
  const { user_id } = req.user;

  try {
    const response = await User.findById(user_id);
    if (!response) {
      res.status(404).send({ msg: "Usuario no encontrado" });
    } else {
      res.status(200).send(response);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error en el servidor" });
  }
}

async function getUsers(req, res) {
  const { active } = req.query;

  try {
    let response = null;
    if (active == undefined) {
      response = await User.find();
    } else {
      response = await User.find({ active });
    }
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error en el servidor" });
  }
}

async function createUser(req, res) {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const user = new User({ ...req.body, active: false, password: hashPassword });

  try {
    if (req.file) {
      const fileName = await uploadToStorage(req.file);
      user.avatar = fileName;
    }
    const userStored = await user.save();
    res.status(200).send(userStored);
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Error en el proceso de usuario" });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  try {
    if (userData.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(userData.password, salt);
      userData.password = hashPassword;
    } else {
      delete userData.password;
    }

    if (req.file) {
      const fileName = await uploadToStorage(req.file);
      const oldUser = await User.findById(id);

      if (oldUser.avatar) {
        await deleteFromStorage(oldUser.avatar);
      }

      userData.avatar = fileName;
    }

    const response = await User.findByIdAndUpdate(id, userData);
    if (!response) {
      res.status(404).send({ msg: "Usuario no encontrado" });
    } else {
      res.status(200).send({ msg: "Actualización correcta" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error en el servidor" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (user.avatar) {
      await deleteFromStorage(user.avatar);
    }

    res.status(200).send({ msg: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error en el servidor" });
  }
}

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
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
