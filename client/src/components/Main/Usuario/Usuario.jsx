import React, { useEffect, useState } from "react";
import { FaTrash } from 'react-icons/fa';

const Usuario = () => {
  const [reservas, setReservas] = useState([]); 
  const [error, setError] = useState(""); 
  const API_URL = import.meta.env.VITE_API_URL || '/api'

  const email = "steph_d@hotmail.com"; 

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const resp = await fetch(`${API_URL}/reservas/${email}`);
        
        if (!resp.ok) {
          throw new Error(`Error ${resp.status}: ${resp.statusText}`);
        }

        const data = await resp.json();

        if (!data || data.length === 0) {
          setReservas([]);
          setError("No se encontraron reservas.");
          return;
        }

        setReservas(data);
        setError("");
      } catch (error) {
        console.error("Error: ", error);
        setError("Error al obtener las reservas.");
      }
    };

    fetchReservas();
  }, []); 

  const handleDelete = async (juegoNombre) => {
    try {
      const response = await fetch(`${API_URL}/reservas/borrar`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, juego_nombre: juegoNombre })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorData.error}`);
      }

      setReservas(reservas.filter(reserva => reserva.juego_nombre !== juegoNombre));
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      setError("Error al eliminar la reserva.");
    }
  };

  return (
    <div className="usuario-container">
      <h3>Hola...</h3>
      <h3>Mis reservas</h3>
      
      {error && <p className="error-message">{error}</p>}

      {reservas.length === 0 && !error ? (
        <p>No se encontraron reservas para el correo proporcionado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Juego</th>
              <th>Fecha de Reserva</th>
              <th>Fecha de Devolución</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva, index) => (
              <tr key={index}>
                <td>{reserva.juego_nombre}</td>
                <td>{new Date(reserva.fecha_reserva).toLocaleDateString()}</td>
                <td>{new Date(reserva.fecha_devolucion).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(reserva.juego_nombre)}>
                    <FaTrash style={{ color: 'red', cursor: 'pointer' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Usuario;
