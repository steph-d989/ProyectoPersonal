/**
 * @author Stephani Damiani <borrowgames.com> 
 * @exports models
 * @namespace FuncionesReservas
 */

const pool = require('../config/db_pgsql');
const queries = require('../queries/reservas.queries');

/**
 * Descripción: Esta función crea una reserva en la tabla intermedia reservas
 * @memberof FuncionesReservas 
 * @method crearReserva
 * @async 
 * @param {JSON} entry - Un JSON con el email, el nombre del juego y la fecha de devolución del juego.
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const crearReserva = async (entry) => {
    const { email, nombre, fecha_devolucion } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.crearReserva, [email, nombre, fecha_devolucion])
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

/**
 * Descripción: Esta función elimina una reserva de la tabla reservas en base al email
 * y el nombre del Juego que recibe como argumentos.
 * @memberof FuncionesReservas 
 * @method borrarReserva 
 * @async 
 * @param {JSON} entry - Un JSON con el email y el nombre del juego de la fila a eliminar de la tabla
 * @return {Integer} Devuelve el número de rows eliminadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const borrarReserva = async (entry) => {
    const { email, nombre } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.borrarReserva, [email, nombre])
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    console.log(result)
    return result
};

/**
 * Descripción: Obtiene las reservas de un usuario en base a su correo electrónico.
 * @memberof FuncionesReservas 
 * @method obtenerReservasEmail 
 * @async 
 * @param {string} email - El correo electrónico del usuario.
 * @return {Promise<Array>} - Una promesa que resuelve con una matriz de los favoritos del usuario.
 * @throws {Error} Si ocurre un error al obtener los datos.
 */
const obtenerReservasEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.obtenerReservasEmail, [email])
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

module.exports = {
    crearReserva,
    borrarReserva,
    obtenerReservasEmail
}

//PRUEBAS
/*      const objUser = {
        email: 'steph_d@hotmail.com',
        nombre: 'Catan',
        fecha_devolucion: '2024-08-14'
    }

crearReserva(objUser).then(data=>console.log(data)); */
/*     const objUser = {
        email: 'steph_d@hotmail.com',
        nombre: 'Catan'
    }

borrarReserva(objUser).then(data=>console.log(data));   */
//obtenerReservasEmail('steph_d@hotmail.com').then(data=>console.log(data));