const conexao = require('../config/db');

const modelCardapio = {

    cadastrar: async (nome, descricao, categoria, preco, disponivel) => {
        try {
            const [resultado] = await conexao.query("INSERT INTO cardapio (nome, descricao, categoria, preco, disponivel) values(?,?,?,?,?)",
                [nome, descricao, categoria, preco, disponivel])
            return resultado;
        }
        catch (erro) {

            return erro
        }
    },

    listarCardapio: async () => {
        try {
            const [resultado] = await conexao.query("SELECT * FROM cardapio");
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },

    listarCardapioID: async (id) => {
        try {
            const [resultado] = await conexao.query(
                `SELECT nome, descricao, categoria, preco, disponivel FROM cardapio WHERE id_cardapio = ?`,
                [id]);
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },

    listarCardapioNome: async (nome) => {
        try {
            const [resultado] = await conexao.query(
                `SELECT id_cardapio, nome, descricao, categoria, preco, disponivel FROM cardapio WHERE nome LIKE ?`,
                [`%${nome}%`]);
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },

    atualizarCardapio: async (nome, descricao, categoria, preco, disponivel, id) => {
        try {
            const [resultado] = await conexao.query(
                `UPDATE cardapio SET nome = ?, descricao = ?, categoria = ?, preco = ?, disponivel = ? WHERE id_cardapio = ?`,
                [nome, descricao, categoria, preco, disponivel, id]);
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },

    deletarCardapio: async (id) => {
        try {
            const [resultado] = await conexao.query(
                'DELETE FROM cardapio WHERE id_cardapio = ?',
                [id]
            );
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },
};

module.exports = modelCardapio;
