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
 * Descripción: Esta función llama desde la ruta /api/reserva al modelo borrarReserva
 * Este espera recibir por body los dos campos para eliminar la reserva
 * @memberof ControllersReservas 
 * @method borrarReserva
 * @async 
 * @param {Object} req Objeto de petición HTTP de Express.
 * @param {Object} res Objeto de respuesta HTTP de Express.
 * @throws {Error} Error al eliminar la relación reserva
 */
const borrarReserva = async (req, res) => {
    try {
        const reserva = await reservasEntry.borrarReserva(req.body);
        if (reserva != 1) {
            res.status(400).json({ error: "Este usuario no tiene guardada esta reserva" });
        } else {
            res.status(200).json({ message: `Se ha borrado la relación reserva.` });
        } 
    } catch (error) {
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
        } else if (req.query.email) {
            reservas = await reservasEntry.obtenerReservasEmail(req.query.email);
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