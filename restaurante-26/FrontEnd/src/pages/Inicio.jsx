import { useEffect, useState } from "react";
import { mesasApi, cardapioApi, pedidosApi } from "../api/api";

function Inicio() {
  const [totalMesas, setTotalMesas] = useState(0);
  const [mesasOcupadas, setMesasOcupadas] = useState(0);
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalItens, setTotalItens] = useState(0);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarResumo();
  }, []);

  async function carregarResumo() {
    try {
      const mesas = await mesasApi.listar();
      const pedidos = await pedidosApi.listar();
      const cardapio = await cardapioApi.listar();

      setTotalMesas(mesas.length);
      setMesasOcupadas(mesas.filter((m) => m.status === "ocupada").length);
      setTotalPedidos(pedidos.length);
      setTotalItens(cardapio.length);
    } catch (e) {
      setErro("Não foi possível conectar ao servidor. Confira se o backend está rodando.");
    }
  }

  return (
    <div className="pagina">
      <h1>Início</h1>
      <p className="subtitulo">Resumo do restaurante</p>

      {erro && <p className="mensagem-erro">{erro}</p>}

      <div className="cards-resumo">
        <div className="card">
          <p className="card-label">Mesas ocupadas</p>
          <p className="card-valor">{mesasOcupadas} / {totalMesas}</p>
        </div>
        <div className="card">
          <p className="card-label">Pedidos registrados</p>
          <p className="card-valor">{totalPedidos}</p>
        </div>
        <div className="card">
          <p className="card-label">Itens no cardápio</p>
          <p className="card-valor">{totalItens}</p>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
