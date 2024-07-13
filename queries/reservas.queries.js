const queriesReservas = {
    crearReserva: `INSERT INTO
        reservas(usuario_id, juego_id, fecha_devolucion)
    VALUES
        ((SELECT
            u.usuario_id
        FROM
            usuario as u
        WHERE
            email=$1), $2, $3)`
}

module.exports = queriesReservas;