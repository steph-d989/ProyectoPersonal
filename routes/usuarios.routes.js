const express = require('express');
const usuariosControllers = require("../controllers/usuarios.controllers");

const router = express.Router();

router.get('/:email?', usuariosControllers.obtenerUsuarios);
router.delete('/borrar/:email', usuariosControllers.borrarUsuario);
router.post('/crear', usuariosControllers.crearUsuario);
router.post('/register', usuariosControllers.register);
router.post('/login', usuariosControllers.login);
router.put('/editar', usuariosControllers.editarUsuario);
router.put('/editar/pass', usuariosControllers.editarPass); //ojo considerar para cambiar pass, ingresar contraseña antigua y validar


module.exports = router;