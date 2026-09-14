import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Eventos from "./components/eventos";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/eventos" element={<Eventos />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;