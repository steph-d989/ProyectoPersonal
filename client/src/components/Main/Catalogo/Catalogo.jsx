import React, { useEffect, useState } from "react";
import CardJuegos from "./CardJuegos";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import BoardGameSpinner from "../BoardGameSpinner/BoardGameSpinner";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../../../src/supabaseClient";

const Catalogo = () => {
  const [juegos, setJuegos] = useState([]);
  const [juegosFiltrados, setJuegosFiltrados] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [porPagina] = useState(10);

  useEffect(() => {
    const getJuegos = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("juegos")
          .select("*");

        if (error) throw error;

        const juegosConId = data.map(juego => ({
          ...juego,
          id: juego.id || uuidv4()
        }));

        setJuegos(juegosConId);
        setJuegosFiltrados(juegosConId);
      } catch (error) {
        console.error("Error al obtener los juegos:", error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getJuegos();
  }, []);

  useEffect(() => {
    let filtrados = juegos;

    if (filtroCategoria) {
      filtrados = filtrados.filter(j => j.genero === filtroCategoria);
    }

    if (busqueda) {
      filtrados = filtrados.filter(j =>
        j.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setJuegosFiltrados(filtrados);
    setPagina(1);
  }, [filtroCategoria, busqueda, juegos]);

  const handleChangeCategoria = (e) => setFiltroCategoria(e.target.value);
  const handleChangeBusqueda = (e) => setBusqueda(e.target.value);
  const handlePaginaChange = (e, value) => setPagina(value);

  const indiceUltimo = pagina * porPagina;
  const indicePrimero = indiceUltimo - porPagina;
  const juegosActuales = juegosFiltrados.slice(indicePrimero, indiceUltimo);

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
            {juegosActuales.map((juego) => (
              <CardJuegos key={juego.id} juego={juego} />
            ))}
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
