const conexao = require('../config/db');

const modelPedidos = {

    cadastrar: async (id_mesa, id_cardapio, preco_unitario, observacao) => {
        try {
            const [resultado] = await conexao.query("INSERT INTO pedidos (id_mesa, id_cardapio, preco_unitario, observacao) values(?,?,?,?)",
                [id_mesa, id_cardapio, preco_unitario, observacao])
            return resultado;
        }
        catch (erro) {

            return erro
        }
    },

    listarPedidos: async () => {
        try {
            const [resultado] = await conexao.query("SELECT * FROM pedidos");
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },

    listarPedidosID: async (id) => {
        try {
            const [resultado] = await conexao.query(
                `SELECT id_mesa, id_cardapio, preco_unitario, observacao FROM pedidos WHERE id_pedidos = ?`,
                [id]);
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },



    atualizarPedidos: async (id_mesa, id_cardapio, preco_unitario, observacao, id) => {
        try {
            const [resultado] = await conexao.query(
                `UPDATE pedidos SET id_mesa = ?, id_cardapio = ?, preco_unitario = ?, observacao = ? WHERE id_pedidos = ?`,
                [id_mesa, id_cardapio, preco_unitario, observacao, id]);
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },

    deletarPedidos: async (id) => {
        try {
            const [resultado] = await conexao.query(
                'DELETE FROM pedidos WHERE id_pedidos = ?',
                [id]
            );
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },
};

module.exports = modelPedidos;
