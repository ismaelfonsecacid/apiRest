function register(req, res) {
    // Agrega el mensaje al cuerpo de la respuesta
    const responseMessage = "Hola has llegado";

    console.log("Se ha ejecutado el registro");

    // Envía la respuesta al cliente con el mensaje agregado
    res.status(200).send({ msg: "Todo okardo", additionalMsg: responseMessage });
}

module.exports = {
    register,
}
