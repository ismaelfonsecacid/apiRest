const User = require("../models/user")

async function getMe(req,res) {
    const {user_id} = req.user

    const response = await User.findById(user_id);

    if(!response){
        res.status(400).send({msg:"No se ha encontrado usuario"});
    } else {
        res.status(200).send(response);
    }


}

module.exports = {
    getMe,
}