const express = require("express");
const controllerPedidos = require('../controllers/controllerPedidos');
const routers = express.Router();

routers.post("/cadastrarpedidos", controllerPedidos.cadastrarPedidos);
routers.get("/listarpedidos", controllerPedidos.listarPedidos);
routers.put("/atualizarpedidos/:id", controllerPedidos.atualizarPedidos);
routers.delete("/deletarpedidos/:id", controllerPedidos.deletarPedidos);
routers.get("/listarpedidos/:id", controllerPedidos.listarPedidosID);

module.exports = routers;