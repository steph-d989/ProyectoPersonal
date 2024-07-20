import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../../../public/Frame_9.svg';


const Nav = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo de Mi Empresa de Juegos" className="logo-image" />
        </Link>
      </div>

      <div className="menu-toggle" onClick={toggleMobileMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/catalogo">Inicio</Link></li>
          <li><Link to="/usuario/steph_d@hotmail.com">Mi perfil</Link></li>
          <li><Link to="/quienes_somos">Quienes somos?</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>

      <ul className="navbar-links">
        <li><Link to="/catalogo">Inicio</Link></li>
        <li><Link to="/usuario/steph_d@hotmail.com">Mi perfil</Link></li>
        <li><Link to="/quienes_somos">Quienes somos?</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
