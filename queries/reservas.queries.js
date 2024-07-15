const queriesReservas = {
    crearReserva: `INSERT INTO
        reservas(usuario_id, juego_id, fecha_devolucion)
    VALUES
        ((SELECT
            u.usuario_id
        FROM
            usuarios as u
        WHERE
            u.email=$1), 
		 (SELECT
            j.juego_id
        FROM
            juegos as j
        WHERE
            j.nombre=$2), 
		$3)`,

    borrarReserva: `DELETE FROM 
        reservas
    WHERE
        usuario_id = (SELECT 
                        u.usuario_id
                    FROM 
                        usuarios AS u
                    WHERE 
                        u.email=$1)
    AND 
        juego_id = (SELECT 
                        j.juego_id
                    FROM 
                        juegos AS j
                    WHERE 
                        j.nombre=$2)`,

    obtenerReservasEmail: `SELECT
        u.nombre AS usuario_nombre,
        j.nombre AS juego_nombre,
        r.fecha_reserva,
        r.fecha_devolucion
    FROM 
        reservas AS r
    JOIN
        usuarios AS u
    ON
        r.usuario_id = u.usuario_id
    JOIN
        juegos AS j
    ON
        r.juego_id = j.juego_id
    WHERE 
        u.email = $1`
}

module.exports = queriesReservas;