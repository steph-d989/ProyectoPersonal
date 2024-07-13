/**
 * @author Stephani Damiani <borrowgames.com> 
 * @exports models
 * @namespace FuncionesReservas
 */

const pool = require('../config/db_pgsql');
const queries = require('../queries/reservas.queries');

/**
 * Descripción: Esta función crea un userFavorite en la tabla intermedia userFavorite
 * @memberof FuncionesReservas 
 * @method crearReserva
 * @async 
 * @param {JSON} entry - Un JSON con el usuario_id, el juego_id y la fecha de devolución del juego.
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const crearReserva = async (entry) => {
    const { usuario_id, juego_id, fecha_devolucion } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createUserFavorite, [usuario_id, juego_id, fecha_devolucion])
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

module.exports = {
    crearReserva
}