import { useEffect, useState } from "react";
import { cardapioApi } from "../api/api";

const FORM_VAZIO = { nome: "", descricao: "", categoria: "", preco: "", disponivel: "1" };

function Cardapio() {
  const [itens, setItens] = useState([]);
  const [form, setForm] = useState(FORM_VAZIO);
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarItens();
  }, []);

  async function carregarItens() {
    try {
      const dados = await cardapioApi.listar();
      setItens(dados);
    } catch (e) {
      setErro("Não foi possível carregar o cardápio.");
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    try {
      if (editandoId) {
        await cardapioApi.atualizar(editandoId, form);
      } else {
        await cardapioApi.criar(form);
      }
      setForm(FORM_VAZIO);
      setEditandoId(null);
      carregarItens();
    } catch (e) {
      setErro(e.message);
    }
  }

  function handleEditar(item) {
    setForm({
      nome: item.nome,
      descricao: item.descricao,
      categoria: item.categoria,
      preco: item.preco,
      disponivel: item.disponivel // CORRIGIDO: mantém 1 ou 0
    });
    setEditandoId(item.id_cardapio);
  }

  function handleCancelar() {
    setForm(FORM_VAZIO);
    setEditandoId(null);
  }

  async function handleDeletar(id) {
    if (!confirm("Excluir este item do cardápio?")) return;
    try {
      await cardapioApi.deletar(id);
      carregarItens();
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <div className="pagina">
      <h1>Cardápio</h1>

      {erro && <p className="mensagem-erro">{erro}</p>}

      <form className="formulario" onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome do prato" value={form.nome} onChange={handleChange} required />
        <input name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} required />
        <input name="preco" type="number" step="0.01" placeholder="Preço" value={form.preco} onChange={handleChange} required />
        <select name="disponivel" value={form.disponivel} onChange={handleChange}>
          <option value="1">Disponível</option>
          <option value="0">Indisponível</option>
        </select>
        <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} className="campo-largo" />
        <button type="submit">{editandoId ? "Salvar" : "Adicionar"}</button>
        {editandoId && <button type="button" onClick={handleCancelar}>Cancelar</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item) => (
            <tr key={item.id_cardapio}>
              <td>{item.nome}</td>
              <td>{item.categoria}</td>
              <td>R$ {Number(item.preco).toFixed(2)}</td>
              <td>
                <span className={`badge ${item.disponivel === "1" ? "livre" : "ocupada"}`}>
                  {item.disponivel === "1" ? "Disponível" : "Indisponível"}
                </span>
              </td>
              <td className="acoes">
                <button onClick={() => handleEditar(item)}>Editar</button>
                <button onClick={() => handleDeletar(item.id_cardapio)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cardapio;