import { useEffect, useState } from "react";
import { mesasApi } from "../api/api";

const FORM_VAZIO = { numero: "", capacidade: "", status: "livre" };

function Mesas() {
  const [mesas, setMesas] = useState([]);
  const [form, setForm] = useState(FORM_VAZIO);
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarMesas();
  }, []);

  async function carregarMesas() {
    try {
      const dados = await mesasApi.listar();
      setMesas(dados);
    } catch (e) {
      setErro("Não foi possível carregar as mesas.");
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
        await mesasApi.atualizar(editandoId, form);
      } else {
        await mesasApi.criar(form);
      }
      setForm(FORM_VAZIO);
      setEditandoId(null);
      carregarMesas();
    } catch (e) {
      setErro(e.message);
    }
  }

  function handleEditar(mesa) {
    setForm({ numero: mesa.numero, capacidade: mesa.capacidade, status: mesa.status });
    setEditandoId(mesa.id_mesa);
  }

  function handleCancelar() {
    setForm(FORM_VAZIO);
    setEditandoId(null);
  }

  async function handleDeletar(id) {
    if (!confirm("Excluir esta mesa?")) return;
    try {
      await mesasApi.deletar(id);
      carregarMesas();
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <div className="pagina">
      <h1>Mesas</h1>

      {erro && <p className="mensagem-erro">{erro}</p>}

      <form className="formulario" onSubmit={handleSubmit}>
        <input
          name="numero"
          type="number"
          placeholder="Número"
          value={form.numero}
          onChange={handleChange}
          required
        />
        <input
          name="capacidade"
          type="number"
          placeholder="Capacidade"
          value={form.capacidade}
          onChange={handleChange}
          required
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="livre">Livre</option>
          <option value="ocupada">Ocupada</option>
          <option value="reservada">Reservada</option>
        </select>
        <button type="submit">{editandoId ? "Salvar" : "Adicionar"}</button>
        {editandoId && <button type="button" onClick={handleCancelar}>Cancelar</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Capacidade</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {mesas.map((mesa) => (
            <tr key={mesa.id_mesa}>
              <td>{mesa.numero}</td>
              <td>{mesa.capacidade}</td>
              <td><span className={`badge ${mesa.status}`}>{mesa.status}</span></td>
              <td className="acoes">
                <button onClick={() => handleEditar(mesa)}>Editar</button>
                <button onClick={() => handleDeletar(mesa.id_mesa)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Mesas;
