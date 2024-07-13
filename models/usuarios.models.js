/**
 * @author Stephani Damiani <futurefest.com> 
 * @exports models
 * @namespace FuncionesUsuario
 */


const pool = require('../config/db_pgsql');
const queries = require('../queries/usuarios.queries');


/**
 * Descripción: Esta función crea un usuario en la tabla Usuarios
 * @memberof FuncionesUsuario 
 * @method crearUsuario 
 * @async
 * @param {JSON} entry - JSON con todos los campos para crear una fila de usuario
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const crearUsuario = async (entry) => {
    let { nombre, email, pass_hash, rol } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.crearUsuario, [nombre, email, pass_hash, rol])
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
    crearUsuario
}

//PRUEBAS
/*     const objUser = {
        nombre: 'Juanita de los Matorrales',
        email: 'matorralesunidos@hotmail.com',
        pass_hash: 'lkjhgfd987654',
        rol: 'user'
    }

crearUsuario(objUser).then(data=>console.log(data)); */

/*PRUEBA 2 */
/*const objUpdate = {
    newPass: "safafas9999",
    email: 'juan@hotmail.com'
}*/