import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Catalogo from "./Catalogo";
import JuegosDetalle from "./JuegosDetalle";

const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Navigate to="/catalogo" replace />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/juego/:nombre" element={<JuegosDetalle />} />
      </Routes>
    </main>
  );
};

export default Main;
