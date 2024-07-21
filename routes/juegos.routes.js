const express = require('express');
const juegosControllers = require("../controllers/juegos.controllers");
const validarJuegos = require("../validator/juegos.validator")

const router = express.Router();

router.get('/:nombre?', juegosControllers.obtenerJuegos);
router.get('/paginacion', juegosControllers.obtenerJuegosPaginacion);
router.delete('/borrar/:nombre', juegosControllers.borrarJuego);
router.post('/crear', validarJuegos.validarCrearJuego(), juegosControllers.crearJuego);
router.put('/editar', juegosControllers.editarJuego);

module.exports = router;