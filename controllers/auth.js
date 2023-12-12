function register(req,res) {
    console.log("Se ha ejecutado el resgistro");

    res.status(200).send({msg:"Todo ok"})
}




module.exports = {
    register,
}