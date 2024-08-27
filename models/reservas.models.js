/**
 * @author Stephani Damiani <borrowgames.com> 
 * @exports models
 * @namespace FuncionesReservas
 */

const supabase = require('../config/db_supa');
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
    try {
        const { data, error } = await supabase
            .from('reservas')
            .insert([{ email, nombre, fecha_devolucion }]);

        if (error) throw error;

        return data.length; // Devuelve el número de reservas creadas
    } catch (err) {
        console.log(err);
        throw err;
    }
};

/**
 * Descripción: Esta función elimina una reserva de la tabla reservas en base al email
 * y el nombre del juego que recibe como argumentos.
 * @memberof FuncionesReservas 
 * @method borrarReserva 
 * @async 
 * @param {Object} entry - Un objeto con el email y el nombre del juego de la fila a eliminar.
 * @return {Integer} Devuelve el número de filas eliminadas en la tabla.
 * @throws {Error} Error de consulta a la BBDD.
 */
const borrarReserva = async (entry) => {
    const { email, nombre } = entry;
    try {
        const { data, error } = await supabase
            .from('reservas')
            .delete()
            .match({ email, nombre });

        if (error) throw error;

        return data.length; // Devuelve el número de reservas eliminadas
    } catch (err) {
        console.log("Error al borrar la reserva:", err);
        throw err;
    }
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
    try {
        // Primero, obtenemos el usuario para obtener su ID.
        const { data: usuarioData, error: usuarioError } = await supabase
            .from('usuarios')
            .select('usuario_id')
            .eq('email', email)
            .single(); // Asumimos que el email es único

        if (usuarioError) throw usuarioError;

        const usuarioId = usuarioData?.usuario_id;

        if (!usuarioId) return []; // Si no se encuentra el usuario, devolvemos un array vacío

        // Ahora obtenemos las reservas del usuario utilizando el ID del usuario.
        const { data: reservasData, error: reservasError } = await supabase
            .from('reservas')
            .select(`
                fecha_reserva,
                fecha_devolucion,
                juegos (nombre AS juego_nombre),
                usuarios (nombre AS usuario_nombre)
            `)
            .eq('usuario_id', usuarioId);

        if (reservasError) throw reservasError;

        return reservasData; // Devuelve los datos de las reservas
    } catch (err) {
        console.log(err);
        throw err;
    }
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
obtenerReservasEmail('steph_d@hotmail.com').then(data=>console.log(data));