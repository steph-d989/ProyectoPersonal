/**
 * @author Stephani Damiani <futurefest.com> 
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

module.exports = {
    crearJuego
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

/*PRUEBA 2 */
/*const objUpdate = {
    newPass: "safafas9999",
    email: 'juan@hotmail.com'
}*/