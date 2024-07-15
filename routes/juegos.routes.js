const express = require('express');
const juegosControllers = require("../controllers/juegos.controllers");

const router = express.Router();

router.get('/:nombre?', juegosControllers.obtenerJuegos);
router.get('/paginacion', juegosControllers.obtenerJuegosPaginacion);
router.delete('/borrar/:nombre', juegosControllers.borrarJuego);
router.put('/crear', juegosControllers.crearJuego);
router.put('/editar', juegosControllers.editarJuego);

module.exports = router;