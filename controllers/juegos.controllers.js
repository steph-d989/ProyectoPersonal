/**
 * @author Stephani Damiani <borrowfest.com> 
 * @exports controllers
 * @namespace controllersJuegos 
 */

const juegosEntry = require('../models/juegos.models');

/**
 * Descripción: Esta función llama desde la ruta /api/juegos al modelo crearJuego
 * Este espera recibir por body todos los campos para crear el juego
 * @memberof controllersJuegos 
 * @method crearJuego
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al crear el juego
 */
const crearJuego = async (req, res) => {
    try {
        const response = await juegosEntry.crearJuego(req.body);
        res.status(201).json({
            message: `Juego creado: ${req.body.nombre}`
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el juego', error });
    }
};

/**
 * Descripción: Esta función llama desde la ruta /api/juegos/:nombre? al modelo borrarUsuario
 * Este espera recibir por query o por body el nombre del juego a eliminar. 
 * @memberof controllersJuegos 
 * @method borrarJuego
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al eliminar el juego
 */
const borrarJuego = async (req, res) => {
    let juego;
    try {
        if (req.body.nombre) {
            juego = await juegosEntry.borrarJuego(req.body.nombre);
            res.status(200).json({ message: `Se ha borrado el juego ${req.body.nombre}.` });
        } else if (req.params.nombre) {
            juego = await juegosEntry.borrarJuego(req.params.nombre);
            res.status(200).json({ message: `Se ha borrado el juego ${req.params.nombre}.` });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

/**
 * Descripción: Esta función llama desde la ruta /api/juegos:nombre? al modelo obtenerJuegos
 * Este espera recibir por query o por body el nombre del juego a buscar. Si no, mostrará todos los juegos
 * @memberof controllersJuegos 
 * @method obtenerJuegos
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al buscar los/el juego/s
 */
const obtenerJuegos = async (req, res) => {
    let juegos;
    try {
        if (req.body.nombre || req.query.nombre) {
            juegos = await juegosEntry.obtenerJuegosNombre(req.body.nombre || req.query.nombre);
            if (!juegos || juegos.length === 0) {
                juegos = await juegosEntry.obtenerJuegos();
            }
        } else {
            juegos = await juegosEntry.obtenerJuegos();
        }
        res.status(200).json(juegos);
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

/**
 * Descripción: Esta función llama desde la ruta /api/juegos al modelo editarDisponibilidad
 * Este espera recibir por body la disponibilidad y el nombre del juego a editar.
 * @memberof controllersJuegos 
 * @method editarDisponibilidad
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al editar el juego
 */
const editarJuego = async (req, res) => {
    console.log(req.body)
   try {
            console.log(req.body)
            const response = await juegosEntry.editarDisponibilidad(req.body);
            console.log(response)
            res.status(201).json({
                items_updated: response.rowCount,
                message: `Se ha modificado el juego ${response.nombre}`
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
};

/**
 * Descripción: Esta función llama desde la ruta /api/juegos/paginacion al modelo obtenerJuegosPaginacion
 * Este espera recibir por params la pagina y la cantidad de elementos por pagina.
 * @memberof controllersJuegos 
 * @method obtenerJuegosPaginacion
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error en la BBDD
 */
const obtenerJuegosPaginacion = async (req, res) => {
    const pagina = parseInt(req.query.pagina) || 1;
    const porPagina = parseInt(req.query.porPagina) || 10;

    try {
        const juegos = await juegosEntry.obtenerJuegosPaginacion(pagina, porPagina);
        res.status(200).json(juegos);
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};


module.exports = {
    crearJuego,
    borrarJuego,
    obtenerJuegos,
    editarJuego,
    obtenerJuegosPaginacion
};