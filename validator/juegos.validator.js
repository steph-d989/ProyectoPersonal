const { body, query, validationResult } = require('express-validator');

const validarCrearJuego = () => {
    return [
        body('nombre')
            .notEmpty().withMessage('El nombre es obligatorio')
            .isString().withMessage('El nombre debe ser una cadena de texto'),
        body('descripcion')
            .notEmpty().withMessage('La descripción es obligatoria')
            .isString().withMessage('La descripción debe ser una cadena de texto'),
        body('genero')
            .notEmpty().withMessage('El género es obligatorio')
            .isString().withMessage('El género debe ser una cadena de texto'),
        body('numero_jugadores_min')
            .isInt({ min: 1 }).withMessage('El número mínimo de jugadores debe ser un número entero positivo'),
        body('numero_jugadores_max')
            .isInt({ min: 1 }).withMessage('El número máximo de jugadores debe ser un número entero positivo'),
        body('edad_recomendada')
            .isInt({ min: 1 }).withMessage('La edad recomendada debe ser un número entero positivo o cero'),
        body('tiempo_juego')
            .isString().withMessage('El tiempo de juego debe ser una cadena de texto'),
        body('video_url')
            .optional()
            .isURL().withMessage('El URL del video debe ser una URL válida'),
        body('imagen')
            .optional()
            .isURL().withMessage('El URL de la imagen debe ser una URL válida'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ];
};



module.exports = {
    validarCrearJuego
}