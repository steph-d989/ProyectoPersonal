/* Crear tabla de Usuarios */
CREATE TABLE Usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    pass_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    is_logged BOOLEAN DEFAULT FALSE NOT NULL
);

/* Crear tabla de Juegos */
CREATE TABLE Juegos (
    juego_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    genero VARCHAR(50),
    numero_jugadores_min INT NOT NULL,
    numero_jugadores_max INT NOT NULL,
    edad_recomendada INT,
    tiempo_juego VARCHAR(50),
    disponibilidad BOOLEAN DEFAULT TRUE NOT NULL,
    video_url VARCHAR(255),
    imagen VARCHAR(255)
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