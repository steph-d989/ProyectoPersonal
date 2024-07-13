/**
 * @author Stephani Damiani <borrowgames.com> 
 * @exports models
 * @namespace FuncionesJuegos
 */


const pool = require('../config/db_pgsql');
const queries = require('../queries/juegos.queries');


/**
 * Descripción: Esta función crea un usuario en la tabla Usuarios
 * @memberof FuncionesJuegos 
 * @method crearJuego 
 * @async
 * @param {JSON} entry - JSON con todos los campos para crear una fila de juego
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const crearJuego = async (entry) => {
    let { nombre, descripcion, genero, numero_jugadores_min, numero_jugadores_max, edad_recomendada, tiempo_juego, video_url, imagen } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.crearJuego, [nombre, descripcion, genero, numero_jugadores_min, numero_jugadores_max, edad_recomendada, tiempo_juego, video_url, imagen])
        console.log(data);
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
 * Descripción: Esta función elimina el usuario de la tabla usuarios
 * @memberof FuncionesJuegos 
 * @method borrarJuego
 * @async
 * @param {JSON} nombre - JSON con el email del usuario a eliminar
 * @return {Integer} Devuelve el número de rows eliminadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const borrarJuego = async (nombre) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.borrarJuego, [nombre])
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
 * Descripción: Esta función muestra a todos los usuarios de la tabla users
 * @memberof FuncionesJuegos 
 * @method obtenerJuegos 
 * @async 
 * @return {Array} Devuelve array con todos los usuarios (objetos) de la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const obtenerJuegos = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.obtenerJuegos)
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

/**
 * Descripción: Esta función muestra a 10 usuarios de la tabla usuarios
 * @memberof FuncionesJuegos 
 * @method obtenerJuegosPaginacion 
 * @async 
 * @return {Array} Devuelve array con los 10 juegos (objetos) de la tabla para paginación
 * @throws {Error} Error de consulta a la BBDD
 */
const obtenerJuegosPaginacion = async (pagina, porPagina) => {
    let client, result;
    try {
        client = await pool.connect();
        const offset = (pagina-1)*porPagina
        const data = await client.query(queries.obtenerJuegosPaginacion, [porPagina, offset])
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

/**
 * Descripción: Esta función edita el campo role_name de la tabla Roles
 * @memberof FuncionesJuegos 
 * @method editarDisponibilidad 
 * @async
 * @param {JSON} entry - Un JSON con el nuevo nombre del juego y con la disponibilidad antigua.
 * @return {Integer} Devuelve el número de rows editadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const editarDisponibilidad = async (entry) => {
    const { nombre, disponibilidad } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.editarDisponibilidad, [nombre, disponibilidad])
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
    crearJuego,
    borrarJuego,
    obtenerJuegos,
    obtenerJuegosPaginacion,
    editarDisponibilidad
}

//PRUEBAS
/* const objJuego =   {
    nombre: 'Catan',
    descripcion: 'Juego de estrategia y comercio.',
    genero: 'Estrategia',
    numero_jugadores_min: 3,
    numero_jugadores_max: 4,
    edad_recomendada: 10,
    tiempo_juego: '60-90 minutos',
    video_url: 'https://www.youtube.com/watch?v=N5SljJbSRgc&pp=ygUFY2F0YW4%3D',
    imagen: 'https://i.ebayimg.com/images/g/724AAOSwB-1YyeTu/s-l1200.jpg'
  }

crearJuego(objJuego).then(data=>console.log(data)); */
//borrarJuego('Catan').then(data=>console.log(data));
//obtenerJuegos().then(data=>console.log(data))
/*PRUEBA 2 */
/* const objUpdate = {
    disponibilidad: "true",
    nombre: 'Catan'
}
editarDisponibilidad(objUpdate).then(data=>console.log(data)); */