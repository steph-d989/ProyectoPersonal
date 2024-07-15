require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

// Logger
app.use(morgan(':method :host :status - :response-time ms :body'));

app.use(express.json()); // Habilito recepción de JSON en servidor

// Importar rutas
//API
const usuariosApiRoutes = require('./routes/usuarios.routes.js');
const juegosApiRoutes = require('./routes/juegos.routes.js');
const reservaApiRoutes = require('./routes/reservas.routes.js');

// Rutas
//API
app.use('/api/usuarios', usuariosApiRoutes);
app.use('/api/juegos', juegosApiRoutes);
app.use('/api/reservas', reservaApiRoutes);

// Para rutas no existentes
app.use('*',error404);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});