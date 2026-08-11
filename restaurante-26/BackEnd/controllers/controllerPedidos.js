const modelPedidos = require('../models/modelPedidos');

const controllerPedidos = {

    
    cadastrarPedidos: async (req, res) => {
        try {
            const { id_mesa, id_cardapio, preco_unitario, observacao} = req.body;

            const resultado = await modelPedidos.cadastrar( id_mesa, id_cardapio, preco_unitario, observacao );

            
            res.status(201).json({ msg: "Pedido cadastrado com sucesso!!!" });
        }
        catch (erro) {
            console.log(erro)
            res.status(500).json({ error: 'Erro ao tentar cadastrar o pedido' });
        }
    },

   
    listarPedidos: async (req, res) => {
        try {
            const pedidos = await modelPedidos.listarPedidos();

            res.status(200).json(pedidos);
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Erro ao buscar pedidos' });
        }
    },

  
    listarPedidosID: async (req, res) => {
        try {
            const [pedidos] = await modelPedidos.listarPedidosID(req.params.id);

            console.log(pedidos);

            res.status(200).json(pedidos);
        } catch (erro) {
            res.status(500).json({ success: false, message: 'Erro ao buscar pedido' });
        }
    },


    atualizarPedidos: async (req, res) => {
        const { id_mesa, id_cardapio, preco_unitario, observacao } = req.body;

        try {
            const consulta = await modelPedidos.listarPedidosID(req.params.id);

            if (consulta.length > 0) {

                const atualizar = await modelPedidos.atualizarPedidos( id_mesa, id_cardapio, preco_unitario, observacao, req.params.id);

               if (atualizar.affectedRows > 0) {
                     res.status(200).json({ msg: "Pedido atualizado com sucesso!" });
                } else {
                     res.status(404).json({ msg: "Pedido não encontrado." });
                }           
            }
            else {
                res.status(404).json({ msg: `O ID ${req.params.id} não existe na base de dados` })
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao tentar atualizar o pedido'});
            
        }
    },

    deletarPedidos: async (req, res) => {
        try {

            const consulta = await modelPedidos.listarPedidosID(req.params.id);

            if (consulta.length > 0) {

                const resultado = await modelPedidos.deletarPedidos(req.params.id);

                if (resultado.affectedRows > 0) {
                    res.status(204).end()
                }
                else {
                    res.status(404).json({ msg: "Erro ao deletar o pedido" })
                }
            }
            else {
                res.status(404).json({ msg: "O ID não existe na base de dados" })
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao tentar deletar' });
        }
    },
};

module.exports = controllerPedidos;


