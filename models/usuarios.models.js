/**
 * @author Stephani Damiani <borrowgames.com> 
 * @exports models
 * @namespace FuncionesUsuario
 */

const supabase = require('../config/db_supa');
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
    const { nombre, email, pass_hash } = entry;
    try {
        const { data, error } = await supabase
            .from('usuarios')
            .insert([{ nombre, email, pass_hash }]);

        if (error) throw error;

        return data.length; // El número de filas insertadas.
    } catch (err) {
        console.log(err);
        throw err;
    }
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
    try {
        const { data, error } = await supabase
            .from('usuarios')
            .delete()
            .eq('email', email);

        if (error) throw error;

        return data.length; // El número de filas eliminadas.
    } catch (err) {
        console.log(err);
        throw err;
    }
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
    try {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*');

        if (error) throw error;

        return data; // El array con todos los usuarios.
    } catch (err) {
        console.log(err);
        throw err;
    }
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
    const offset = (pagina - 1) * porPagina;
    try {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .range(offset, offset + porPagina - 1);

        if (error) throw error;

        return data; // El array con los usuarios para la página solicitada.
    } catch (err) {
        console.log(err);
        throw err;
    }
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
    try {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('email', email);

        if (error) throw error;

        return data; // El array con el usuario seleccionado.
    } catch (err) {
        console.log(err);
        throw err;
    }
};

/**
 * Descripción: Esta función edita el rol de un usuario en la tabla usuarios
 * @memberof FuncionesUsuario 
 * @method editarUsuario 
 * @async 
 * @param {JSON} entry - Un JSON con el nuevo valor de rol a modificar, más el email del usuario a editar
 * @return {Object} Devuelve un objeto con el número de filas modificadas y el email del usuario
 * @throws {Error} Error de consulta a la BBDD
 */
const editarUsuario = async (entry) => {
    const { rol, email } = entry;
    try {
        const { data, error } = await supabase
            .from('usuarios')
            .update({ rol })
            .eq('email', email);

        if (error) throw error;

        return { rowCount: data.length, email }; // Número de filas modificadas.
    } catch (err) {
        console.log(err);
        throw err;
    }
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
    try {
        const { data, error } = await supabase
            .from('usuarios')
            .update({ pass_hash })
            .eq('email', email);

        if (error) throw error;

        return { rowCount: data.length, email }; // Número de filas modificadas.
    } catch (err) {
        console.log(err);
        throw err;
    }
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
