import React from "react";
import { Link } from "react-router-dom";
//import logo from '../../../assets/Logo.jpeg';

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
{/*         <Link to="/">
          <img src={logo} alt="Logo de Mi Empresa de Juegos" className="logo-image" />
        </Link> */}
      </div>
      <ul className="navbar-links">
        <li><Link to="/catalogo">Inicio</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;