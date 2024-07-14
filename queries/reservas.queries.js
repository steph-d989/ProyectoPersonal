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
        *
    FROM 
        reservas AS r
    WHERE 
        r.usuario_id=(SELECT 
                        r.usuario_id 
                    FROM 
                        usuarios AS u
                    WHERE 
                        u.email=$1)`
}

module.exports = queriesReservas;