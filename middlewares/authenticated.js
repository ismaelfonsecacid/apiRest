const jwt = require("jsonwebtoken")

function asureAuth(req,res,next) {

    req.headers.authorization

  

    next()
}


module.exports = {
    asureAuth
}