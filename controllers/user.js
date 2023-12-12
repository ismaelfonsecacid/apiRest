function getMe(req,res) {
    res.status(200).send({msg:"Todo bien"})
}

module.exports = {
    getMe,
}