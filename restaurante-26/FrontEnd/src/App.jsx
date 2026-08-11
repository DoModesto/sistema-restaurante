import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Inicio from "./pages/Inicio";
import Cardapio from "./pages/Cardapio";
import Mesas from "./pages/Mesas";
import Pedidos from "./pages/Pedidos";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/cardapio" element={<Cardapio />} />
            <Route path="/mesas" element={<Mesas />} />
            <Route path="/pedidos" element={<Pedidos />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
