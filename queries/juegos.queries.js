const queriesJuegos = {

    crearJuego: `INSERT INTO 
    juegos (nombre, descripcion, genero, numero_jugadores_min, numero_jugadores_max, edad_recomendada, tiempo_juego, video_url, imagen)
    VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9)`
}

module.exports = queriesJuegos;
