/* Crear tabla de Usuarios */
CREATE TABLE Usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    pass_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'user' NOT NULL,
    is_logged BOOLEAN DEFAULT FALSE NOT NULL
);

/* Crear tabla de Juegos */
CREATE TABLE Juegos (
    juego_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    genero VARCHAR(50),
    numero_jugadores_min INT NOT NULL,
    numero_jugadores_max INT NOT NULL,
    edad_recomendada INT,
    tiempo_juego VARCHAR(50),
    disponibilidad BOOLEAN DEFAULT TRUE NOT NULL,
    video_url VARCHAR(1000),
    imagen VARCHAR(1000)
);

/* Crear tabla de reservas */
CREATE TABLE Reservas (
    reserva_id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    juego_id INT NOT NULL,
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_devolucion DATE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (juego_id) REFERENCES Juegos(juego_id)
);

/* Poblar tabla usuarios */
INSERT INTO Usuarios(nombre, email, pass_hash, rol)
    VALUES 
        ('Stephani Damiani', 'steph_d@hotmail.com', '123456qwert', 'admin');

/* Poblar tabla juegos */
INSERT INTO juegos(nombre, descripcion, genero, numero_jugadores_min, numero_jugadores_max, edad_recomendada, tiempo_juego, video_url, imagen)
    VALUES 
        ('Jaipur',
        'Juego de cartas y comercio en el que los jugadores compiten como comerciantes en la India medieval.',
        'Familiar',
        2,
        2,
        12,
        '30 minutos',
        'https://www.youtube.com/watch?v=vvRwNycqKzc&t=46s',
        'https://www.monodejuegos.shop/wp-content/uploads/2019/04/jaipur-2019.png');

/* Poblar tabla reservas */
INSERT INTO Reservas (usuario_id, juego_id, fecha_devolucion)
    VALUES
        (1, 1, '2024-07-20')

/* Borrar usuario por email */
DELETE FROM 
    usuarios 
WHERE 
    email = 'matorralesunidos@hotmail.com';

/* Borrar juego por nombre */
DELETE FROM 
    juegos 
WHERE 
    nombre = 'catan';

/* Obtener todos los usuarios */
SELECT 
    usuario_id,
    nombre,
    email,
    rol,
    is_logged
FROM 
    usuarios; 

/* Obtener todos los juegos */
SELECT 
    *
FROM 
    juegos; 

/* Obtener 10 usuarios para paginación */
SELECT
    usuario_id,
    nombre,
    email,
    rol,
    is_logged
FROM
    usuarios
ORDER BY
    nombre
LIMIT 10 OFFSET 0;

/* Obtener 10 juegos para paginación */
SELECT
    *
FROM
    juegos
ORDER BY
    nombre
LIMIT 10 OFFSET 0;

/* Obtener usuarios por Email */
SELECT 
    usuario_id,
    nombre,
    email,
    rol,
    is_logged
FROM 
    usuarios
WHERE
    email='steph_d@hotmail.com';

/* Editar Rol por Email */
UPDATE
    usuarios
SET 
    rol=user
WHERE 
    email='steph_d@hotmail.com'

/* Editar disponibilidad de juego por nombre */
UPDATE
    juegos
SET 
    disponibiliad='false'
WHERE 
    nombre='Catan'

/* Crear reserva */
INSERT INTO
        reservas(usuario_id, juego_id, fecha_devolucion)
    VALUES
        ((SELECT
            u.usuario_id
        FROM
            usuarios as u
        WHERE
            email='steph_d@hotmail.com'), 1, '2024-08-13')

/* Borrar una reserva */
DELETE FROM 
        reservas
WHERE
    usuario_id = (SELECT 
                    u.usuario_id
                FROM 
                    usuarios AS u
                WHERE 
                    u.email='steph_d@hotmail.com')
AND 
    juego_id = (SELECT 
                    j.juego_id
                FROM 
                    juegos AS j
                WHERE 
                    j.nombre='Catan')

/* Obtener reservas por email */
SELECT
    u.nombre AS usuario_nombre,
    j.nombre AS juego_nombre,
    r.fecha_reserva,
    r.fecha_devolucion
FROM 
    reservas AS r
JOIN
    usuarios AS u
ON
    r.usuario_id = u.usuario_id
JOIN
    juegos AS j
ON
    r.juego_id = j.juego_id
WHERE 
    u.email = "steph_d@hotmail.com";


/* obtener juegos por nombre */
SELECT 
    *
FROM 
    juegos
WHERE
    nombre='Catan'