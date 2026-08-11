// Endereço do backend. Se a porta do seu servidor Express for outra, troque aqui.
const API_URL = "http://localhost:3001";

// Função genérica que todas as chamadas usam por baixo dos panos.
async function request(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    headers: { "Content-Type": "application/json" },
    ...opcoes,
  });

  // status 204 (delete) não tem corpo pra converter em JSON
  if (resposta.status === 204) return null;

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.msg || dados.error || "Erro na requisição");
  }

  return dados;
}

// ---------- MESAS ----------
export const mesasApi = {
  listar: () => request("/listarmesas"),
  criar: (mesa) => request("/cadastrarmesas", { method: "POST", body: JSON.stringify(mesa) }),
  atualizar: (id, mesa) => request(`/atualizarmesa/${id}`, { method: "PUT", body: JSON.stringify(mesa) }),
  deletar: (id) => request(`/deletarmesa/${id}`, { method: "DELETE" }),
};

// ---------- CARDÁPIO ----------
export const cardapioApi = {
  listar: () => request("/listarcardapio"),
  criar: (item) => request("/cadastrarcardapio", { method: "POST", body: JSON.stringify(item) }),
  atualizar: (id, item) => request(`/atualizarcardapio/${id}`, { method: "PUT", body: JSON.stringify(item) }),
  deletar: (id) => request(`/deletarcardapio/${id}`, { method: "DELETE" }),
};

// ---------- PEDIDOS ----------
export const pedidosApi = {
  listar: () => request("/listarpedidos"),
  criar: (pedido) => request("/cadastrarpedidos", { method: "POST", body: JSON.stringify(pedido) }),
  atualizar: (id, pedido) => request(`/atualizarpedidos/${id}`, { method: "PUT", body: JSON.stringify(pedido) }),
  deletar: (id) => request(`/deletarpedidos/${id}`, { method: "DELETE" }),
};
