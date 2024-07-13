const { obtenerJuegos } = require("../models/juegos.models");

const queriesJuegos = {

    crearJuego: `INSERT INTO 
    juegos 
        (nombre, descripcion, genero, numero_jugadores_min, numero_jugadores_max, edad_recomendada, tiempo_juego, video_url, imagen)
    VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    
    borrarJuego: `DELETE FROM 
        juegos 
    WHERE 
        nombre=$1`,
    
    obtenerJuegos: `SELECT 
        * 
    FROM
        juegos`,
    
    obtenerJuegosPaginacion: `SELECT
        *
    FROM
        juegos
    ORDER BY
        nombre
    LIMIT $1 OFFSET $2`,

    editarDisponibilidad: `UPDATE
        juegos
    SET 
        disponibilidad=$2
    WHERE 
        nombre=$1`,
}

module.exports = queriesJuegos;
