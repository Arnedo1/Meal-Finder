import { Route, Routes, HashRouter, Navigate } from "react-router-dom";
import Home from "./pages";
import Favorieten from "./pages/favorieten";
import Boodschappenlijst from "./pages/boodschappenlijst";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/index" replace />} />
        <Route path="/index" element={<Home />} />
        <Route path="/favorieten" element={<Favorieten />} />
        <Route path="/boodschappenlijst" element={<Boodschappenlijst />} />
      </Routes>
      <NavBar />
    </HashRouter>
  );
}