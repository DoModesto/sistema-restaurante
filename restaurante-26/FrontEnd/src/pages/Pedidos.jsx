import { useEffect, useState } from "react";
import { pedidosApi, mesasApi, cardapioApi } from "../api/api";

const FORM_VAZIO = { id_mesa: "", id_cardapio: "", preco_unitario: "", observacao: "" };

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [cardapio, setCardapio] = useState([]);
  const [form, setForm] = useState(FORM_VAZIO);
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarTudo();
  }, []);

  async function carregarTudo() {
    try {
      const [dadosPedidos, dadosMesas, dadosCardapio] = await Promise.all([
        pedidosApi.listar(),
        mesasApi.listar(),
        cardapioApi.listar(),
      ]);
      setPedidos(dadosPedidos);
      setMesas(dadosMesas);
      setCardapio(dadosCardapio);
    } catch (e) {
      setErro("Não foi possível carregar os pedidos.");
    }
  }

  // Ao escolher um prato, já preenche o preço automaticamente
  function handleChange(e) {
    const { name, value } = e.target;
    const novoForm = { ...form, [name]: value };

    if (name === "id_cardapio") {
      const item = cardapio.find((c) => String(c.id_cardapio) === value);
      if (item) novoForm.preco_unitario = item.preco;
    }

    setForm(novoForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    try {
      if (editandoId) {
        await pedidosApi.atualizar(editandoId, form);
      } else {
        await pedidosApi.criar(form);
      }
      setForm(FORM_VAZIO);
      setEditandoId(null);
      carregarTudo();
    } catch (e) {
      setErro(e.message);
    }
  }

  function handleEditar(pedido) {
    setForm({
      id_mesa: pedido.id_mesa,
      id_cardapio: pedido.id_cardapio,
      preco_unitario: pedido.preco_unitario,
      observacao: pedido.observacao || "",
    });
    setEditandoId(pedido.id_pedidos);
  }

  function handleCancelar() {
    setForm(FORM_VAZIO);
    setEditandoId(null);
  }

  async function handleDeletar(id) {
    if (!confirm("Excluir este pedido?")) return;
    try {
      await pedidosApi.deletar(id);
      carregarTudo();
    } catch (e) {
      setErro(e.message);
    }
  }

  function nomeMesa(id) {
    const mesa = mesas.find((m) => m.id_mesa === id);
    return mesa ? `Mesa ${mesa.numero}` : id;
  }

  function nomeItem(id) {
    const item = cardapio.find((c) => c.id_cardapio === id);
    return item ? item.nome : id;
  }

  return (
    <div className="pagina">
      <h1>Pedidos</h1>

      {erro && <p className="mensagem-erro">{erro}</p>}

      <form className="formulario" onSubmit={handleSubmit}>
        <select name="id_mesa" value={form.id_mesa} onChange={handleChange} required>
          <option value="">Mesa</option>
          {mesas.map((m) => (
            <option key={m.id_mesa} value={m.id_mesa}>Mesa {m.numero}</option>
          ))}
        </select>

        <select name="id_cardapio" value={form.id_cardapio} onChange={handleChange} required>
          <option value="">Item do cardápio</option>
          {cardapio.map((c) => (
            <option key={c.id_cardapio} value={c.id_cardapio}>{c.nome}</option>
          ))}
        </select>

        <input
          name="preco_unitario"
          type="number"
          step="0.01"
          placeholder="Preço"
          value={form.preco_unitario}
          onChange={handleChange}
          required
        />
        <input
          name="observacao"
          placeholder="Observação (opcional)"
          value={form.observacao}
          onChange={handleChange}
          className="campo-largo"
        />
        <button type="submit">{editandoId ? "Salvar" : "Adicionar"}</button>
        {editandoId && <button type="button" onClick={handleCancelar}>Cancelar</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Mesa</th>
            <th>Item</th>
            <th>Preço</th>
            <th>Observação</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id_pedidos}>
              <td>{nomeMesa(pedido.id_mesa)}</td>
              <td>{nomeItem(pedido.id_cardapio)}</td>
              <td>R$ {Number(pedido.preco_unitario).toFixed(2)}</td>
              <td>{pedido.observacao}</td>
              <td className="acoes">
                <button onClick={() => handleEditar(pedido)}>Editar</button>
                <button onClick={() => handleDeletar(pedido.id_pedidos)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Pedidos;
