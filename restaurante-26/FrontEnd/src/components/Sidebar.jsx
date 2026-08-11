import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <nav className="sidebar">
      <p className="marca">Sabor & Ponto</p>

      <NavLink to="/" end className="link">Início</NavLink>
      <NavLink to="/cardapio" className="link">Cardápio</NavLink>
      <NavLink to="/mesas" className="link">Mesas</NavLink>
      <NavLink to="/pedidos" className="link">Pedidos</NavLink>
    </nav>
  );
}

export default Sidebar;
