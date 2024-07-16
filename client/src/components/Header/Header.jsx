import { useContext } from 'react'
import Nav from "./Nav";
import { ThemeContext } from '../../context/ThemeContext'
import { UserContext } from '../../context/UserContext'

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { username, updateUsername } = useContext(UserContext)

  return <header className={`header-${theme}`}>
    <Nav/>
    {username ? (
        <>
          <span>Hola,{username}</span>
          <button onClick={() => updateUsername("")}>Logout</button>
        </>
      ) : (
        null
      )}
    <button onClick={() => toggleTheme()}>{theme === "day" ? "\u{1F319}" : "\u{2600}"}</button>
    </header>;
};

export default Header;