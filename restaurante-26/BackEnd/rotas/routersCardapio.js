const express = require("express");
const controllerCardapio = require('../controllers/controllerCardapio');
const routers = express.Router();

routers.post("/cadastrarcardapio", controllerCardapio.cadastrarCardapio);
routers.get("/listarcardapio", controllerCardapio.listarCardapio);
routers.put("/atualizarcardapio/:id", controllerCardapio.atualizarCardapio);
routers.delete("/deletarcardapio/:id", controllerCardapio.deletarCardapio);
routers.get("/listarcardapio/:id", controllerCardapio.listarCardapioID);
routers.get("/listarcardapionome", controllerCardapio.listarCardapioNome);

module.exports = routers;