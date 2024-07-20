import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Catalogo from "./Catalogo";
import JuegosDetalle from "./JuegosDetalle";
import QuienesSomos from "./QuienesSomos/QuienesSomos";
import Usuario from "./Usuario/Usuario";
import Login from "./Login"; // Asegúrate de importar el componente Login

const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Navigate to="/catalogo" replace />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/juego/:nombre" element={<JuegosDetalle />} />
        <Route path="/quienes_somos" element={<QuienesSomos />} />
        <Route path="/usuario/:email" element={<Usuario />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
};

export default Main;
