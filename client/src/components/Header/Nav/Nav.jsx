import { useContext } from 'react'
import { Link } from "react-router-dom";
import { ThemeContext } from '../../../context/ThemeContext'

import burgerIcon from "../../../assets/burger-icon.png";

const Nav = () => {

  const { theme } = useContext(ThemeContext)

  return (
    <nav className={`nav-${theme}`}>
      <input type="checkbox" id="menu" />
      <label htmlFor="menu"><img src={`${burgerIcon}`} alt="burger" width="24px" /></label>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/travel">LogIn</Link>
        </li>
        <li>
          <Link to="/about">Registrar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
