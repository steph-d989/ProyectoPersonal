import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Principal</Link>
        </li>
        <li>
          <Link to="/juegos">Catálogo de Juegos</Link>
        </li>
        <li>
          <Link to="/reservas">Mis Reservas</Link>
        </li>
        <li>
          <Link to="/usuario">Perfil</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/admin">Admin Panel</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;