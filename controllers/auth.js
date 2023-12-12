const User = require("../models/user")

function register(req, res) {
    const {firstname,lastname,email,password} = req.body

    if(!email) res.status(400).send({msg:"Email necesario"})
    if(!password) res.status(400).send({msg:"Password necesaria"})
    console.log(req.body);

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password,
        role:"user",
        active:false
    })

    console.log(user);

    res.status(200).send({msg:"Todo correcto"})
}

module.exports = {
    register,
}

