/**
 * @author Stephani Damiani <borrowgames.com> 
 * @exports models
 * @namespace FuncionesReservas
 */

const supabase = require('../config/db_supa');
const queries = require('../queries/reservas.queries');

/**
 * Formatea una fecha a YYYY-MM-DD
 * @param {Date} date - La fecha a formatear
 * @return {string} La fecha formateada
 */
const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

/**
 * Descripción: Esta función crea una reserva en la tabla intermedia reservas
 * @memberof FuncionesReservas 
 * @method crearReserva
 * @async 
 * @param {Object} entry - Un objeto con el email del usuario y el nombre del juego.
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const crearReserva = async (entry) => {
    const { email, nombre } = entry;
    try {
        const { data: userData, error: userError } = await supabase
            .from('usuarios')
            .select('usuario_id')
            .eq('email', email)
            .single();

        if (userError) throw userError;
        if (!userData) throw new Error('Usuario no encontrado');

        const { data: gameData, error: gameError } = await supabase
            .from('juegos')
            .select('juego_id')
            .eq('nombre', nombre)
            .single();

        if (gameError) throw gameError;
        if (!gameData) throw new Error('Juego no encontrado');

        const fecha_reserva = new Date();
        const fecha_devolucion = new Date(fecha_reserva);
        fecha_devolucion.setDate(fecha_devolucion.getDate() + 7);

        // Insertamos la reserva
        const { data, error } = await supabase
            .from('reservas')
            .insert([
                { 
                    usuario_id: userData.usuario_id,
                    juego_id: gameData.juego_id,
                    fecha_reserva: formatDate(fecha_reserva),
                    fecha_devolucion: formatDate(fecha_devolucion)
                }
            ])
            .select();

        if (error) throw error;

        return data ? data.length : 0;
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
        const { data, error } = await supabase.rpc('borrar_reserva', {
            p_email: email,
            p_nombre_juego: nombre
        });

        if (error) throw error;

        return data || 0; // Devuelve el número de reservas eliminadas o 0 si no hay datos
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
 * @return {Promise<Array>} - Una promesa que resuelve con una matriz de las reservas del usuario.
 * @throws {Error} Si ocurre un error al obtener los datos.
 */
const obtenerReservasEmail = async (email) => {
    try {
        const { data, error } = await supabase
            .from('reservas')
            .select(`
                fecha_reserva,
                fecha_devolucion,
                juegos (nombre),
                usuarios (nombre)
            `)
            .eq('usuarios.email', email)
            .order('fecha_reserva', { ascending: false });

        if (error) throw error;

        // Transformar los datos para que coincidan con el formato esperado
        const transformedData = data.map(reserva => ({
            usuario_nombre: reserva.usuarios.nombre,
            juego_nombre: reserva.juegos.nombre,
            fecha_reserva: reserva.fecha_reserva,
            fecha_devolucion: reserva.fecha_devolucion
        }));

        return transformedData;
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

// PRUEBAS

const objUser = {
    email: 'steph_d@hotmail.com',
    nombre: 'Catan',
    fecha_devolucion: '2024-08-14'
}

//crearReserva(objUser).then(data => console.log(data));
/*
const objUserDelete = {
    email: 'steph_d@hotmail.com',
    nombre: 'Catan'
}

borrarReserva(objUserDelete).then(data => console.log(data));
*/
//obtenerReservasEmail('steph_d@hotmail.com').then(data => console.log(data));
