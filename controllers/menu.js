const Menu = require("../models/menu")

async function createMenu(req,res) {
    const menu = new Menu(req.body)

    menu
    .save()
    .then((menuStored) => {
      res.status(200).send(menuStored);
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error en el proceso de creacion de menu" });
    });

}

async function getMenu(req,res) {
    const {active} = req.query;
    
  let response = null;

  if (active == undefined) {
    response = await Menu.find().sort({order:"asc"});
  } else {
    response = await Menu.find({ active });
  }

  if(!response) {
    res.status(400).send({msg: 'Not Found'});
  } else {
    res.status(200).send(response);
  }
}



module.exports = {
    createMenu,
    getMenu
}