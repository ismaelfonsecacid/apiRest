const User = require("../models/user");
const bcrypt = require("bcryptjs");
const image = require("../utils/image");

async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado usuario" });
  } else {
    res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  const { active } = req.query;

  let response = null;

  if (active == undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send(response);
}

async function createUser(req, res) {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const user = new User({ ...req.body, active: false, password: hashPassword });

  if (req.files.avatar) {
    const imageName = image.getFileName(req.files.avatar);
    user.avatar = imageName;
  }

  user
    .save()
    .then((userStored) => {
      res.status(200).send(userStored);
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error en el proceso de usuario" });
    });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  // Password
  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPassword
  } else {
    delete userData.password;
  }

  // Avatar
  if(req.files.avatar){
    const imagePath = image.getFileName(req.files.avatar)
    userData.avatar = imagePath
  }

  const response = await User.findByIdAndUpdate({ _id: id }, userData);
  if (!response) {
    res.status(400).send({ msg: "Error al actualizar el usuario" });
  } else {
    res.status(200).send({ msg: "Actualizacion correcta" });
  }
}

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
};
