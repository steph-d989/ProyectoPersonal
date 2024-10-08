const express = require('express');
const reservaControllers = require("../controllers/reservas.controllers");

const router = express.Router();

router.get('/:email', reservaControllers.obtenerReservasEmail);
router.delete('/borrar', reservaControllers.borrarReserva);
router.post('/crear', reservaControllers.crearReservas);

module.exports = router;