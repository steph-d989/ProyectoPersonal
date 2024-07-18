import React from "react";
import { Link } from "react-router-dom";
import logo from '../../../../public/Frame_9.svg';

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo de Mi Empresa de Juegos" className="logo-image" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/catalogo">Inicio</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/quienes_somos">Quienes somos?</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;