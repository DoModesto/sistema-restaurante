const express = require("express");
const controllerMesas = require('../controllers/controllerMesas');
const routers = express.Router();

routers.post("/cadastrarmesas", controllerMesas.cadastrarMesa);
routers.get("/listarmesas", controllerMesas.listarMesa);
routers.put("/atualizarmesa/:id", controllerMesas.atualizarMesa);
routers.delete("/deletarmesa/:id", controllerMesas.deletarMesa);
routers.get("/listarmesas/:id", controllerMesas.listarMesaID);
//routers.get("/listarmesanome", controllerMesas.listarMesaNome);

module.exports = routers;