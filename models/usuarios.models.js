/**
 * @author Stephani Damiani <borrowgames.com> 
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

/**
 * Descripción: Esta función elimina el usuario de la tabla usuarios
 * @memberof FuncionesUsuario 
 * @method borrarUsuario
 * @async
 * @param {JSON} email - JSON con el email del usuario a eliminar
 * @return {Integer} Devuelve el número de rows eliminadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const borrarUsuario = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.borrarUsuario, [email])
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
 * Descripción: Esta función muestra a todos los usuarios de la tabla usuarios
 * @memberof FuncionesUsuario 
 * @method obtenerUsuarios 
 * @async 
 * @return {Array} Devuelve array con todos los usuarios (objetos) de la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const obtenerUsuarios = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.obtenerUsuarios)
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
 * @memberof FuncionesUsuario 
 * @method obtenerUsuariosPaginacion 
 * @async 
 * @return {Array} Devuelve array con 10 los usuarios (objetos) de la tabla para paginación
 * @throws {Error} Error de consulta a la BBDD
 */
const obtenerUsuariosPaginacion = async (pagina, porPagina) => {
    let client, result;
    try {
        client = await pool.connect();
        const offset = (pagina - 1) * porPagina
        const data = await client.query(queries.obtenerUsuariosPaginacion, [porPagina, offset])
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
 * Descripción: Esta función muestra un usuario de la tabla users en base a su email
 * @memberof FuncionesUsuario 
 * @method obtenerUsuariosEmail 
 * @async
 * @param {JSON} email -JSON con el email del usuario a obtener
 * @return {Array} Devuelve array con el usuario (objeto) seleccionado de la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const obtenerUsuariosEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.obtenerUsuariosEmail, [email])
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result || [];
};

/**
 * Descripción: Esta función edita el rol, el is_active o el is_logged de un usuario en la tabla users
 * @memberof FuncionesUsuario 
 * @method editarUsuario 
 * @async 
 * @param {JSON} entry - Un JSON con el nuevo valor de rol a modificar, más el email del usuario a editar
 * @return {Object} Devuelve un objeto con el número de filas modificadas y el email del usuario
 * @throws {Error} Error de consulta a la BBDD
 */
const editarUsuario = async (entry) => {
    const { rol, email } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.editarRol, [rol, email]);
        result = { rowCount: data.rowCount, email };
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

/**
 * Descripción: Esta función edita la contraseña de un usuario en la tabla usuarios
 * @memberof FuncionesUsuario 
 * @method editarPass 
 * @async
 * @param {JSON} entry -Un JSON con el nuevo valor de pass_hash a modificar, más el email del usuario.
 * @return {Object} Devuelve un objeto con el número de filas modificadas y el email del usuario
 * @throws {Error} Error de consulta a la BBDD
 */
const editarPass = async (entry) => {
    const { pass_hash, email } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.editarPass, [pass_hash, email])
        result = { rowCount: data.rowCount, email };
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

module.exports = {
    crearUsuario,
    borrarUsuario,
    obtenerUsuarios,
    obtenerUsuariosPaginacion,
    obtenerUsuariosEmail,
    editarUsuario,
    editarPass
}

//PRUEBAS
/*     const objUser = {
        nombre: 'Juanita de los Matorrales',
        email: 'matorralesunidos@hotmail.com',
        pass_hash: 'lkjhgfd987654',
        rol: 'user'
    }

crearUsuario(objUser).then(data=>console.log(data)); */
//borrarUsuario('steph_d@hotmail.com').then(data=>console.log(data));
//obtenerUsuarios().then(data=>console.log(data))
/* const objUpdate = {
    rol: "admin",
    email: 'steph_d@hotmail.com'
} */
//editarUsuario(objUpdate).then(data=>console.log(data));
