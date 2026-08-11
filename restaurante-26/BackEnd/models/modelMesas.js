const conexao = require('../config/db');

const modelMesas = {

    cadastrar: async (numero, capacidade, status) => {
        try {
            const [resultado] = await conexao.query("INSERT INTO mesas (numero, capacidade, status) values(?,?,?)",
                [numero, capacidade, status])
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },

    listarMesas: async () => {
        try {
            const [resultado] = await conexao.query("SELECT * FROM mesas");
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },

    listarMesaID: async (id) => {
        try {
            const [resultado] = await conexao.query(
                `SELECT numero, capacidade, status FROM mesas WHERE id_mesa = ?`,
                [id]);
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },

     /*listarMesaNome: async (nome) => {        
        try {
            const resultado = await conexao.query(
                `SELECT id_mesa, numero, capacidade, status FROM mesas WHERE numero LIKE ?`,
                [`%${nome}%`]);
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },*/

    atualizarMesa: async (numero, capacidade, status, id) => {
        try {
            const [resultado] = await conexao.query(
                `UPDATE mesas SET numero = ?, capacidade = ?, status = ? WHERE id_mesa = ?`,
                [numero, capacidade, status, id]);
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },

    deletarMesa: async (id) => {
        try {
            const [resultado] = await conexao.query(
                'DELETE FROM mesas WHERE id_mesa = ?',
                [id]
            );
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },
};

module.exports = modelMesas;

