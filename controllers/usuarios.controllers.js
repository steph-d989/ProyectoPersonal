/**
 * @author Stephani Damiani <borrowgames.com> 
 * @exports controllers
 * @namespace ControllersUsuarios 
 */

const usersEntry = require('../models/usuarios.models');


/**
 * Descripción: Esta función llama desde la ruta /api/usuarios al modelo crearUsuario
 * Este espera recibir por body todos los campos para crear el usuario
 * @memberof ControllersUsuarios 
 * @method crearUsuario
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al crear el usuario
 */
const crearUsuario = async (req, res) => {
    try {
        const response = await usersEntry.crearUsuario(req.body);
        res.status(201).json({
            message: `usuario creado: ${req.body.email}`
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

/**
 * Descripción: Esta función llama desde la ruta /api/usuarios:email? al modelo obtenerUsuariosEmail
 * Este espera recibir por query o por body el email del usuario a buscar. Si no, mostrará todos los usuarios
 * @memberof ControllersUsuarios 
 * @method obtenerUsuarios
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al buscar los/el usuario/s
 */
const obtenerUsuarios = async (req, res) => {
    let usuarios;
    try {
        if (req.body.email || req.params.email) {
            usuarios = await usersEntry.obtenerUsuariosEmail(req.body.email || req.params.email);
            if (!usuarios || usuarios.length === 0) {
                usuarios = await usersEntry.obtenerUsuarios();
            }
        } else {
            usuarios = await usersEntry.obtenerUsuarios();
        }
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

/**
 * Descripción: Esta función llama desde la ruta /api/usuarios/borrar/:email? al modelo borrarUsuario
 * Este espera recibir por params o por body el email del usuario a eliminar. 
 * @memberof ControllersUsuarios 
 * @method borrarUsuario
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al eliminar el usuario
 */
const borrarUsuario = async (req, res) => {
    let usuarios;
    try {
        if (req.body.email) {
            usuarios = await usersEntry.borrarUsuario(req.body.email);
            res.status(200).json({ message: `Se ha borrado el usuario ${req.body.email}.` });
        } else if (req.params.email) {
            usuarios = await usersEntry.borrarUsuario(req.params.email);
            res.status(200).json({ message: `Se ha borrado el usuario ${req.params.email}.` });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

/**
 * Descripción: Esta función llama desde la ruta /api/usuarios al modelo ediatrUsuario
 * Este espera recibir por body el rol a modificar y el email del usuario a editar.
 * @memberof ControllersUsuarios 
 * @method editarUsuario
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al editar el usuario
 */
const editarUsuario = async (req, res) => {
    console.log(req.body)
    try {
        console.log(req.body)
        const response = await usersEntry.editarUsuario(req.body);
        console.log(response)
        res.status(201).json({
            items_updated: response.rowCount,
            message: `Se ha modificado el usuario ${response.email}`
        });
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

/**
 * Descripción: Esta función llama desde la ruta /api/usuarios/pass al modelo editarPass
 * Este espera recibir por body un nuevo valor de pass_hash y el email del usuario a editar.
 * @memberof ControllersUsuarios 
 * @method editarPass
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al editar la contraseña del usuario
 */
const editarPass = async (req, res) => {
    if (req.body.pass_hash) {
        console.log(req.body)
        try {
            const response = await usersEntry.editarPass(req.body);
            console.log(response)
            res.status(201).json({
                items_updated: response.rowCount,
                message: `Se ha modificado la contraseña del usuario ${response.email}`
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
    }
};

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    borrarUsuario,
    editarUsuario,
    editarPass
};


