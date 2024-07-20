/**
 * @author Stephani Damiani <borrowgames.com> 
 * @exports controllers
 * @namespace ControllersReservas 
 */

const reservasEntry = require('../models/reservas.models');

/**
 * Descripción: Esta función llama desde la ruta /api/reservas al modelo crearReserva
 * Este espera recibir por body todos los campos para crear la reserva
 * @memberof ControllersReservas 
 * @method crearReservas
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al crear la reserva
 */
const crearReservas = async (req, res) => {
    try {
        const response = await reservasEntry.crearReserva(req.body);
        res.status(201).json({
            message: `Reserva creada: ${req.body.nombre}`
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la reserva', error });
    }
};

/**
 * Descripción: Esta función llama desde la ruta /api/reservas/borrar al modelo borrarReserva
 * Este espera recibir por body el email y el nombre del juego para eliminar la reserva
 * @memberof ControllersReservas 
 * @method borrarReserva
 * @async 
 * @param {Object} req Objeto de petición HTTP de Express.
 * @param {Object} res Objeto de respuesta HTTP de Express.
 * @throws {Error} Error al eliminar la reserva.
 */
const borrarReserva = async (req, res) => {
    const { email, juego_nombre } = req.body;

    if (!email || !juego_nombre) {
        return res.status(400).json({ error: "Faltan datos necesarios para eliminar la reserva." });
    }

    try {
        const result = await reservasEntry.borrarReserva({ email, juego_nombre });

        if (result === 0) {
            return res.status(400).json({ error: "No se encontró la reserva para eliminar." });
        }

        res.status(200).json({ message: "Reserva eliminada con éxito." });
    } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        res.status(500).json({ error: "Error en la BBDD" });
    }
};


/**
 * Descripción: Esta función llama desde la ruta /api/reserva o /api/reserva?:usuario_id al modelo obtenerReservaEmail
 * Este espera recibir por body o por query el email del usuario del que queremos obtener sus reservas
 * @memberof ControllersReservas 
 * @method obtenerReservasEmail
 * @async 
 * @param {Object} req Objeto de petición HTTP de Express.
 * @param {Object} res Objeto de respuesta HTTP de Express.
 * @throws {Error} Error al obtener las reservas.
 */
const obtenerReservasEmail = async (req, res) => {
    let reservas;
    try {
        if (req.body.email) {
            reservas = await reservasEntry.obtenerReservasEmail(req.body.email);
        } else if (req.params.email) {
            reservas = await reservasEntry.obtenerReservasEmail(req.params.email);
        }
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
}

module.exports = {
    crearReservas,
    borrarReserva,
    obtenerReservasEmail
};