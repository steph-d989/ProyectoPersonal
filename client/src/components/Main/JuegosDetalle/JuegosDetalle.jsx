import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JuegoDetalle = () => {
  const { nombre } = useParams();
  const [juego, setJuego] = useState(null);

  useEffect(() => {
    const fetchJuego = async () => {
      try {
        const resp = await fetch(`http://localhost:3000/api/juegos/${nombre}`);
        if (resp.ok) {
          const data = await resp.json();
          setJuego(data);
        } else {
          throw new Error("Error al obtener el juego");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchJuego();
  }, [nombre]);

  if (!juego) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{juego.nombre}</h1>
      <p>{juego.descripcion}</p>

    </div>
  );
};

export default JuegoDetalle;
