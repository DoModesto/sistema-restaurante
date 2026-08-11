const modelMesas = require('../models/modelMesas');

const controllerMesas = {

    //Controller para cadastrar as Mesas
    cadastrarMesa: async (req, res) => {
        try {
            const { numero, capacidade, status } = req.body;

            const resultado = await modelMesas.cadastrar(numero, capacidade, status);

            
            res.status(201).json({ msg: "Mesa cadastrada com sucesso!!!" });
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao tentar cadastrar a mesa' });
            console.log(erro);
        }
    },

    //Controller para listar as Mesas
    listarMesa: async (req, res) => {
        try {
            const mesas = await modelMesas.listarMesas();

            res.status(200).json(mesas);
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Erro ao buscar mesas' });
        }
    },

    //Listar mesas por ID 
    listarMesaID: async (req, res) => {
        try {
            const [mesas] = await modelMesas.listarMesaID(req.params.id);

            console.log(mesas);

            res.status(200).json(mesas);
        } catch (erro) {
            res.status(500).json({ success: false, message: 'Erro ao buscar mesas' });
        }
    },

    /*listarMesaNome: async(req,res)=>{
         try {
            const [mesas] = await modelMesas.listarMesaNome(req.query.nome);

            res.status(200).json(mesas);
        } catch (erro) {
            res.status(500).json({ success: false, message: 'Erro ao buscar mesas' });
        }
    },*/

    //Controller para atualizar uma mesa
    atualizarMesa: async (req, res) => {
        const { numero, capacidade, status} = req.body;

        try {
            const consulta = await modelMesas.listarMesaID(req.params.id);

            if (consulta.length > 0) {

                const atualizar = await modelMesas.atualizarMesa(numero, capacidade, status, req.params.id);

                if(atualizar){
                      res.status(200).json({ msg: "Mesa atualizada com sucesso!!!" });
                }
                else{
                    res.status(401).json({msg:"Falha ao atualizar a mesa"});
                }              
            }
            else {
                res.status(404).json({ msg: `O ID ${req.params.id} não existe na base de dados` })
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao tentar atualizar a mesa'});
        }
    },

    deletarMesa: async (req, res) => {
        try {

            const consulta = await modelMesas.listarMesaID(req.params.id);

            if (consulta.length > 0) {

                const resultado = await modelMesas.deletarMesa(req.params.id);

                if (resultado.affectedRows > 0) {
                    res.status(204).end()
                }
                else {
                    res.status(404).json({ msg: "Erro ao deletar a mesa" })
                }
            }
            else {
                res.status(404).json({ msg: "O ID não existe na base de dados" })
            }
        }
        catch (error) {
            console.log(erro)
            res.status(500).json({ error: 'Erro ao tentar deletar' });
        }
    },
};

module.exports = controllerMesas;


