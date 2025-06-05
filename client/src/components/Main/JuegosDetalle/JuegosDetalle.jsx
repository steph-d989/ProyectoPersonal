import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardGameSpinner from "../BoardGameSpinner/BoardGameSpinner";
import { supabase } from "../../../../src/supabaseClient";

const JuegosDetalle = () => {
  const { nombre } = useParams();
  const [juego, setJuego] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJuego = async () => {
      const { data, error } = await supabase
        .from("juegos")
        .select("*")
        .eq("nombre", nombre)
        .single();

      if (error) {
        console.error("Error al obtener el juego:", error);
      } else {
        setJuego(data);
        setFormData(data);
      }
      setLoading(false);
    };

    fetchJuego();
  }, [nombre]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const handleUpdate = async () => {
    const { error } = await supabase
      .from("juegos")
      .update(formData)
      .eq("id", juego.id);

    if (error) {
      alert("Error al actualizar el juego");
      console.error(error);
    } else {
      alert("Juego actualizado correctamente");
      setJuego(formData);
      setIsEditing(false);
    }
  }; 

  if (loading || !juego) return <BoardGameSpinner />;

  return (
    <section className={`JuegosDetalle ${juego.genero || "default"}`}>
      <h1>{juego.nombre}</h1>
      <article>
        <img className="imagenJuego" src={juego.imagen} alt={`Imagen de ${juego.nombre}`} />
        <div>
          {isEditing ? (
            <>
              <label>Descripción:</label>
              <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
              <label>Género:</label>
              <input name="genero" value={formData.genero} onChange={handleChange} />
              <label>Jugadores Min:</label>
              <input name="numero_jugadores_min" type="number" value={formData.numero_jugadores_min} onChange={handleChange} />
              <label>Jugadores Max:</label>
              <input name="numero_jugadores_max" type="number" value={formData.numero_jugadores_max} onChange={handleChange} />
              <label>Edad Recomendada:</label>
              <input name="edad_recomendada" value={formData.edad_recomendada} onChange={handleChange} />
              <label>Tiempo de juego:</label>
              <input name="tiempo_juego" value={formData.tiempo_juego} onChange={handleChange} />
              <button onClick={handleUpdate}>Guardar cambios</button>
            </>
          ) : (
            <>
              <p>Descripción: {juego.descripcion}</p>
              <p>Género: {juego.genero}</p>
              <p>Jugadores Min: {juego.numero_jugadores_min}</p>
              <p>Jugadores Max: {juego.numero_jugadores_max}</p>
              <p>Edad recomendada: {juego.edad_recomendada}</p>
              <p>Tiempo de juego: {juego.tiempo_juego}</p>
              {/* <button onClick={() => setIsEditing(true)}>Editar</button> */}
            </>
          )}
        </div>
      </article>

      {juego.video_url && (
        <iframe
          width="560"
          height="315"
          src={juego.video_url}
          title={juego.nombre}
          allowFullScreen
        />
      )}

      <button onClick={async () => {
        const reservaData = {
          email: "steph_d@hotmail.com",
          nombre: juego.nombre,
          fecha_devolucion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };

        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/reservas/crear`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservaData)
          });

          if (response.ok) {
            const data = await response.json();
            alert(data.message);
          } else {
            throw new Error("Error al reservar");
          }
        } catch (err) {
          alert("Fallo al reservar");
          console.error(err);
        }
      }}>
        Reservar
      </button>
    </section>
  );
};

export default JuegosDetalle;
