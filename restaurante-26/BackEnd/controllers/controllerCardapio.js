const modelCardapio = require('../models/modelCardapio');

const controllerCardapio = {

    
    cadastrarCardapio: async (req, res) => {
        try {
            const { nome, descricao, categoria, preco, disponivel} = req.body;

            const resultado = await modelCardapio.cadastrar( nome, descricao, categoria, preco, disponivel);

            
            res.status(201).json({ msg: "Prato cadastrado com sucesso!!!" });
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao tentar cadastrar o item' });
        }
    },

   
    listarCardapio: async (req, res) => {
        try {
            const cardapio = await modelCardapio.listarCardapio();

            res.status(200).json(cardapio);
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Erro ao buscar item' });
        }
    },

  
    listarCardapioID: async (req, res) => {
        try {
            const [cardapio] = await modelCardapio.listarCardapioID(req.params.id);

            console.log(cardapio);

            res.status(200).json(cardapio);
        } catch (erro) {
            res.status(500).json({ success: false, message: 'Erro ao buscar item' });
        }
    },

    listarCardapioNome: async (req, res) => {
    try {
        const cardapio = await modelCardapio.listarCardapioNome(req.query.nome);  // sem os colchetes []

        res.status(200).json(cardapio);
    } catch (erro) {
        res.status(500).json({ success: false, message: 'Erro ao buscar item' });
    }
},


    atualizarCardapio: async (req, res) => {
        const {  nome, descricao, categoria, preco, disponivel} = req.body;

        try {
            const consulta = await modelCardapio.listarCardapioID(req.params.id);

            if (consulta.length > 0) {

                const atualizar = await modelCardapio.atualizarCardapio( nome, descricao, categoria, preco, disponivel, req.params.id);

               if (atualizar.affectedRows > 0) {
                     res.status(200).json({ msg: "Cardápio atualizado com sucesso!" });
                } else {
                     res.status(404).json({ msg: "Cardápio não encontrado." });
                }           
            }
            else {
                res.status(404).json({ msg: `O ID ${req.params.id} não existe na base de dados` })
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao tentar atualizar o item'});
            
        }
    },

    deletarCardapio: async (req, res) => {
        try {

            const consulta = await modelCardapio.listarCardapioID(req.params.id);

            if (consulta.length > 0) {

                const resultado = await modelCardapio.deletarCardapio(req.params.id);

                if (resultado.affectedRows > 0) {
                    res.status(204).end()
                }
                else {
                    
                    res.status(404).json({ msg: "Erro ao deletar o item" })
                }
            }
            else {
                res.status(404).json({ msg: "O ID não existe na base de dados" })
            }
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro ao tentar deletar' });
        }
    },
};

module.exports = controllerCardapio;


