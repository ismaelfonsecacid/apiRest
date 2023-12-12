const bcrypt = require("bcryptjs");
const User = require("../models/user");
 
async function register(req, res) {
  const { firstName, lastName, email, password } = req.body;
 
  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });
 
  const user = new User({
    firstName,
    lastName,
    email: email.toLowerCase(),
    role: "user",
    active: false
  });
 
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;
 
  try {
    await user.save();
    res.status(200).send({ msg: "Usuario guardado" });
  } catch (err) {
    res.status(400).send({ msg: `Error al crear el usuario` });
  }
}
 
module.exports = {
  register
};