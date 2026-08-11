const express = require("express");
const cors = require("cors");
const conexao = require("../config/db")
const routersMesas = require('../rotas/routersMesas');
const routersCardapio = require('../rotas/routersCardapio');
const routersPedidos = require('../rotas/routersPedidos');


const app = express();
const port = 3001;


app.use(express.json());
app.use(cors());
app.use(routersMesas);
app.use(routersCardapio);
app.use(routersPedidos);


const verificarConexao = async () => {
  try {
    await conexao.query("SELECT 1");
    console.log("Conexão com o banco de dados está ativa");
    app.listen(port, () => {
      console.log(`Servidor rodando na url: http://localhost:${port}`);
    });
  } catch (erro) {
    console.log("Erro: Falha na conexão com o banco de dados \n" + erro);
  }
};

verificarConexao();


