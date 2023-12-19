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
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDmRSVxk/HORP7i\nqTdlPOPHju1JKkYCjzVJzRbt8MMUH6UmQp3bUWYxEGd8gMJ4qAj/SpZ9/ALC02ds\nCtMQUt/pyD03CAyFZQi03t0dqVD1YK0yRy6YOr8z6zFoV8oPcBbPlCm0jtXbHpaD\nh121lt8UN0UjX2a5tqp4GL4FfiPoPTLVR8dafUbxIbALeJs8fbi1jYyutWuO0Nz7\nC41GNNfbHXGF/cp/qJGdVCfEvRrKjuCsiPvOQQS9kefoVM+X/CC/cYiHtAsXeu+E\nZYwdtm2q5qvxfiYzEP1h1tT4/vhJ1tORuttVp7H6qqui4qR8zaVmNdM70ywWwJQv\nL4T5XM/9AgMBAAECgf8wkmVTj+FxoRwis477y9xAO+XRiRk7cPnMl3Y+uoprtEEh\n0Ot7V7A2qT8rA/4BdXBwaUtVR9NNRUqLf70FtHWG2rYO5aO+f5FWlawOlah+GeZu\ntJUfh0TNrs69M8drejlVj+s8KuTxU4JsPCGILErh+Macr4L7qYxLyOxMPE9WrSuQ\nNT/pCfEMIOPeizTpqrPr5pEaS2PKqXfAD3jt003vjXUV1frX/EodhBlOSsqs2Yqh\nS7R6qQ1zqqrC7mXbQut3fI9mKtUI1o4rq+HhT8GlAmnNu0IisSPQsfASOybjgDCf\nNUZs6DpF6dmjZAbSR2priXd3gb3zSr6xyKxjS+kCgYEA+s2cSj98Z/jOq7SH4Ix7\nhQp6djShh/Te3tGB4i4yv+sCMq6Sgj6bWe0WwA8t2H+tQpcd+5XC4MQP8Rkpl5Jl\n+Gg5S7NtOyvGq3VCxzLGp4am5A856o8jiJQUhfT1+GU+FpU2lo1B1ynlRLk0QroX\naBd7N1kcS392j18NpYA0hAcCgYEA6wqeJzYUiTpcy3YRjdtGZQcHSpvroNKWsFsu\nifVpSHpEDGj977L+XSLwib0v+1YP/11M98524RKK4dESwoJ2CHG82dDT8CYn/Ogi\nhKxjRlmB4HlIrgx1oc6KlzwfpUBRQSVL3jlPy70joe1HrJtWTPThEmLXEpJjKs2g\nIQeFstsCgYEAknd7G31B6PJLt8jhRUilZge9hsSrxNtDQLr3cCBssNnM2c5Lb1ai\noPytuZHjwzik9WuNLfzC50J40ONR/9uWQ2CSfVwWoWSqTD1Ztz02+GTRmAQwXYQk\nS0G3TpfFAcAWZ1fSnk92MPKdmunR1FobC0YTRjp7JLgWhBoNvSZHBQcCgYBpd/o/\n3iSY73d0VSbLYPnVm7HJ6O1y3QyBVmkrvtPfkf23E+XfCZLaeDM3m41MWvISxOsk\nx6DQnmFzsz2XyrLsVx1HIE36FSUcd44FutVRXBjLgaD7eNvQH75Q3snUfWf4s6O3\ntD/6TIUQxEjFS28OWVQly/R2gPm+20Zfi+CSwQKBgGoUahdtuj1SY6dbfysCMDIv\nth5a/ngX+uCTL15UYVo7uEbpx2R2aTt61PYnEeSkIPKSTkoXOs5BNQwyOnr328p+\nXw3kLPKkghD4g8R9vCHt0MnvxPFZDCc+QFbmL6ba9mYdc49mtdAAnNiwSxTDLB0t\nJj8sABLf5+pwO48+RjjD\n-----END PRIVATE KEY-----\n"
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
