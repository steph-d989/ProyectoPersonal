import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardGameSpinner from "../BoardGameSpinner/BoardGameSpinner";


const JuegosDetalle = () => {
  const { nombre } = useParams();
  const [juego, setJuego] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    const fetchJuego = async () => {
      try {
        const resp = await fetch(`${API_URL}/juegos`);
        if (resp.ok) {
          const data = await resp.json();
          console.log("Datos del array de juegos:", data);
          const juegoEncontrado = data.find(juego => juego.nombre.toLowerCase() === nombre.toLowerCase());
          if (juegoEncontrado) {
            setJuego(juegoEncontrado);
          } else {
            console.error("Juego no encontrado.");
          }
        } else {
          throw new Error("Error al obtener los juegos");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchJuego();
  }, [nombre]);

  const handleReservar = async () => {
    const reservaData = {
      email: "steph_d@hotmail.com",
      nombre: juego.nombre,
      fecha_devolucion: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString()
    };

    try {
      const response = await fetch(`${API_URL}/reservas/crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservaData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        throw new Error('Error al crear la reserva');
      }
    } catch (error) {
      console.error("Error:", error);
      alert('No se pudo crear la reserva');
    }
  };

  if (!juego) {
    return <div><BoardGameSpinner /></div>;
  }


  const categoryClass = juego.genero || "default";

  return (
    <section className={`JuegosDetalle ${categoryClass}`}>
      <h1>{juego.nombre}</h1>
      <article>
        <img className="imagenJuego" src={juego.imagen} alt={`Imagen de ${juego.nombre}`} />
        <div>
          <p>Descripcion: {juego.descripcion}</p>
          <p>Categoria: {juego.genero}</p>
          <p>Minimo de jugadores: {juego.numero_jugadores_min}</p>
          <p>Maximo de jugadores: {juego.numero_jugadores_max}</p>
          <p>Edad minima recomendada: {juego.edad_recomendada}</p>
          <p>Tiempo de partida: {juego.tiempo_juego}</p>
        </div>
      </article>
      <iframe
        width="560"
        height="315"
        src={juego.video_url}
        title={juego.nombre}
        style={{ border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <button onClick={handleReservar}>Reservar</button>
    </section>
  );
};

export default JuegosDetalle;
