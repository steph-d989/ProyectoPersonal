import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JuegosDetalle = () => {
  const { nombre } = useParams();

  const [juego, setJuego] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getJuego = async () => {
      try {
        const resp = await fetch(`http://localhost:3000/api/juegos/${nombre}`);
        if (resp.ok) {
          const data = await resp.json();
          if (data) {
            setJuego(data); 
          } else {
            throw new Error(`Juego con nombre '${nombre}' no encontrado`);
          }
        } else {
          throw new Error("Error al obtener el juego");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); 
      }
    };

    getJuego();
  }, [nombre]); 

  if (loading) return <div>Cargando...</div>;

  if (!juego) {
    return <div>No se encontró el juego.</div>;
  }

  return (
    <div className="juego-detalle">
      <h1>{juego.nombre}</h1>
      <img src={juego.imagen} alt={`juego-${juego.nombre}`} />
      <div className="info-juego">
        <p>{juego.descripcion}</p>
        <p>Género: {juego.genero}</p>
        <p>Número de jugadores: {juego.numero_jugadores_min} - {juego.numero_jugadores_max}</p>
        <p>Edad recomendada: {juego.edad_recomendada}</p>
        <p>Tiempo de juego: {juego.tiempo_juego}</p>
      </div>
      <div className="video-container">
        <iframe
          title={`Video de ${juego.nombre}`}
          width="560"
          height="315"
          src={juego.video_url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

    </div>
  );
};

export default JuegosDetalle;
