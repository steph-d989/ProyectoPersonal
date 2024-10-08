import React from "react";
import { Link } from "react-router-dom";

const CardJuegos = ({ juego }) => {
  const { imagen, nombre, descripcion, genero, id } = juego;

  const shadowClass = `card-juegos--${genero.toLowerCase()}`;

  return (
    <Link to={`/juego/${nombre}`} className="card-juegos-link">
      <article className={`card-juegos ${shadowClass}`}>
        <h2 className="card-juegos__title">{nombre}</h2>
        <img className="card-juegos__image" src={imagen} alt={`juego-${nombre}`} />
        <p className="card-juegos__description">{descripcion}</p>
        <p className="card-juegos__genre">{genero}</p>
      </article>
    </Link>
  );
};

export default CardJuegos;
