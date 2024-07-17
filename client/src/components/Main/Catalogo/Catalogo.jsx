import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CardJuegos from "./CardJuegos";

const Catalogo = () => {
  const [juegos, setJuegos] = useState([]);
  const [juegosFiltrados, setJuegosFiltrados] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const getJuegos = async () => {
      try {
        const resp = await fetch("http://localhost:3000/api/juegos");
        if (resp.ok) {
          const data = await resp.json();
          setJuegos(data);
          setJuegosFiltrados(data);
        } else {
          throw new Error("Error al obtener los juegos");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getJuegos();
  }, []);

  useEffect(() => {
    if (filtroCategoria !== "") {
      const juegosFiltrados = juegos.filter(juego => juego.genero === filtroCategoria);
      setJuegosFiltrados(juegosFiltrados);
    } else {
      setJuegosFiltrados(juegos); 
    }
  }, [filtroCategoria, juegos]);

  useEffect(() => {
    if (busqueda !== "") {
      const juegosFiltrados = juegos.filter(juego =>
        juego.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
      setJuegosFiltrados(juegosFiltrados);
    } else {
      setJuegosFiltrados(juegos);
    }
  }, [busqueda, juegos]);

  const handleChangeCategoria = (e) => {
    setFiltroCategoria(e.target.value);
    setBusqueda(""); 
  };


  const handleChangeBusqueda = (e) => {
    setBusqueda(e.target.value);
    setFiltroCategoria(""); 
  };

  const pintarJuegos = () => {
    return juegosFiltrados.map((juego) => <CardJuegos key={uuidv4()} juego={juego} />);
  };

  return (
    <div className="catalogo-container">
      <div>
        <label htmlFor="categoria">Filtrar por categoría:</label>
        <select id="categoria" value={filtroCategoria} onChange={handleChangeCategoria}>
          <option value="">Todos</option>
          <option value="Estrategia">Estrategia</option>
          <option value="Familiar">Familiar</option>
          <option value="Aventura">Aventura</option>
          <option value="RPG">RPG</option>
        </select>
      </div>

      <div>
        <label htmlFor="busqueda">Buscar juego:</label>
        <input
          type="text"
          id="busqueda"
          value={busqueda}
          onChange={handleChangeBusqueda}
          placeholder="Nombre del juego..."
        />
      </div>

      <div className="catalogo-lista">{pintarJuegos()}</div>
    </div>
  );
};

export default Catalogo;
