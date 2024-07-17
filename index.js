require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000;
const path = require('path');

// Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

const loggerFormat = ':method :url :status :response-time ms - :res[content-length]'

app.use(morgan(loggerFormat, {
    skip: function (req, res) {
        return res.statusCode < 400
    },
    stream: process.stderr
}));

app.use(express.json()); // Habilito recepción de JSON en servidor
app.use(express.static(path.join(__dirname, 'client/build')));

// Importar rutas
//API
const usuariosApiRoutes = require('./routes/usuarios.routes.js');
const juegosApiRoutes = require('./routes/juegos.routes.js');
const reservaApiRoutes = require('./routes/reservas.routes.js');
app.use(cors()); 

// Rutas
//API
app.use('/api/usuarios', usuariosApiRoutes);
app.use('/api/juegos', juegosApiRoutes);
app.use('/api/reservas', reservaApiRoutes);

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});