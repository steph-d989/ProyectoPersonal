import { BrowserRouter } from "react-router-dom";
import { useContext, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

// Importamos el contexto
import { ThemeContext } from "./context/ThemeContext";
import { UserContext } from "./context/UserContext";

function App() {
  const [theme, setTheme] = useState("night");
  const [username, setUsername] = useState('Hola');

  // Cambiamos el tema
  const toggleTheme = () => setTheme(theme === "day" ? "night" : "day");

  //actualizamos el nombre de ususario
  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };


  const themeData = { theme,toggleTheme }
  const userData = { username, updateUsername } 

  return (
    <>
      <ThemeContext.Provider value={themeData}>
      <UserContext.Provider value={userData}> 
        <BrowserRouter>
          <Header />
          <Main />
        </BrowserRouter>
        </UserContext.Provider>
        <Footer />
      </ThemeContext.Provider>
     
    </>
  );
}

export default App;