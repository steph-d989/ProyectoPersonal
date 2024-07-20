require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Middlewares
const morgan = require('morgan'); // Asegúrate de que morgan esté instalado y sea el paquete correcto

const loggerFormat = ':method :url :status :response-time ms - :res[content-length]';

app.use(morgan(loggerFormat, {
    skip: function (req, res) {
        return res.statusCode < 400;
    },
    stream: process.stderr
}));

app.use(express.json()); // Habilito recepción de JSON en servidor
//app.use(express.static(path.join(__dirname, 'client/build')));

//api Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//api JSDOC
app.use('/api-jsdoc', express.static(path.join(__dirname, 'jsondocs')));

// Importar rutas
const usuariosApiRoutes = require('./routes/usuarios.routes.js');
const juegosApiRoutes = require('./routes/juegos.routes.js');
const reservaApiRoutes = require('./routes/reservas.routes.js');
app.use(cors()); 

// Rutas
app.use('/api/usuarios', usuariosApiRoutes);
app.use('/api/juegos', juegosApiRoutes);
app.use('/api/reservas', reservaApiRoutes);

/* app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
 */
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
