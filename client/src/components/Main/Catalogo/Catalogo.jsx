import React, { useEffect, useState } from "react";
import CardJuegos from "./CardJuegos";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import BoardGameSpinner from "../BoardGameSpinner/BoardGameSpinner";
import { v4 as uuidv4 } from 'uuid'; 

const Catalogo = () => {
  const [juegos, setJuegos] = useState([]);
  const [juegosFiltrados, setJuegosFiltrados] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [porPagina] = useState(10);
  const API_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    const getJuegos = async () => {
      try {
        console.log("Iniciando fetch de juegos...");
        const resp = await fetch(`${API_URL}/juegos`);
        console.log("Respuesta recibida:", resp.status);
        if (resp.ok) {
          const data = await resp.json();
          console.log("Datos recibidos:", data);
          
          const juegosConId = data.map(juego => ({
            ...juego,
            id: juego.id || uuidv4() 
          }));

          setJuegos(juegosConId);
          setJuegosFiltrados(juegosConId);
        } else {
          const errorText = await resp.text(); 
          throw new Error(`Error al obtener los juegos: ${errorText}`);
        }
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getJuegos();
  }, []);

  useEffect(() => {
    let juegosFiltrados = juegos;

    if (filtroCategoria) {
      juegosFiltrados = juegosFiltrados.filter(juego => juego.genero === filtroCategoria);
    }

    if (busqueda) {
      juegosFiltrados = juegosFiltrados.filter(juego =>
        juego.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setJuegosFiltrados(juegosFiltrados);
    setPagina(1);
  }, [filtroCategoria, busqueda, juegos]);

  const handleChangeCategoria = (e) => {
    setFiltroCategoria(e.target.value);
  };

  const handleChangeBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const handlePaginaChange = (event, value) => {
    setPagina(value);
  };

  const indiceUltimoJuego = pagina * porPagina;
  const indicePrimerJuego = indiceUltimoJuego - porPagina;
  const juegosActuales = juegosFiltrados.slice(indicePrimerJuego, indiceUltimoJuego);

  return (
    <div className="catalogo-container">
      <div className="catalogo-filtros">
        <div className="catalogo-filtro-item">
          <label htmlFor="categoria">Filtrar por categoría:</label>
          <select id="categoria" value={filtroCategoria} onChange={handleChangeCategoria}>
            <option value="">Todos</option>
            <option value="Estrategia">Estrategia</option>
            <option value="Familiar">Familiar</option>
            <option value="Aventura">Aventura</option>
            <option value="RPG">RPG</option>
          </select>
        </div>

        <div className="catalogo-filtro-item">
          <label htmlFor="busqueda">Buscar juego:</label>
          <input
            type="text"
            id="busqueda"
            value={busqueda}
            onChange={handleChangeBusqueda}
            placeholder="Nombre del juego..."
          />
        </div>
      </div>

      {isLoading ? (
        <BoardGameSpinner />
      ) : error ? (
        <div className="error-message">Error: {error}</div>
      ) : juegosFiltrados.length === 0 ? (
        <div className="no-results">No se encontraron juegos</div>
      ) : (
        <>
          <div className="catalogo-lista">
            {juegosActuales.map((juego) => <CardJuegos key={juego.id} juego={juego} />)}
          </div>
          
          <div className="paginacion">
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(juegosFiltrados.length / porPagina)}
                page={pagina}
                onChange={handlePaginaChange}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
        </>
      )}
    </div>
  );
};

export default Catalogo;