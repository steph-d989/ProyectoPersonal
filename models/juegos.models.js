/**
 * @author Stephani Damiani <borrowgames.com> 
 * @exports models
 * @namespace FuncionesJuegos
 */


const supabase = require('../config/db_supa');
const queries = require('../queries/juegos.queries');


/**
 * Descripción: Esta función crea un usuario en la tabla Usuarios
 * @memberof FuncionesJuegos 
 * @method crearJuego 
 * @async
 * @param {JSON} entry - JSON con todos los campos para crear una fila de juego
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const crearJuego = async (entry) => {
    let { nombre, descripcion, genero, numero_jugadores_min, numero_jugadores_max, edad_recomendada, tiempo_juego, video_url, imagen } = entry;
    try {
        const { data, error } = await supabase
          .from('juegos')
          .insert([
            { 
              nombre, 
              descripcion, 
              genero, 
              numero_jugadores_min, 
              numero_jugadores_max, 
              edad_recomendada, 
              tiempo_juego, 
              video_url, 
              imagen 
            }
          ]);
    
        if (error) throw error;
    
        return data.length; // Devuelve el número de juegos creados
      } catch (err) {
        console.error('Error creating game:', err);
        throw err;
      }
};

/**
 * Descripción: Esta función elimina el usuario de la tabla usuarios
 * @memberof FuncionesJuegos 
 * @method borrarJuego
 * @async
 * @param {JSON} nombre - JSON con el email del usuario a eliminar
 * @return {Integer} Devuelve el número de rows eliminadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const borrarJuego = async (nombre) => {
    try {
      const { data, error } = await supabase
        .from('juegos')
        .delete()
        .eq('nombre', nombre);
  
      if (error) throw error;
  
      return data.length; // Devuelve el número de juegos eliminados
    } catch (err) {
      console.error('Error deleting game:', err);
      throw err;
    }
  };

/**
 * Descripción: Esta función muestra a todos los usuarios de la tabla users
 * @memberof FuncionesJuegos 
 * @method obtenerJuegos 
 * @async 
 * @return {Array} Devuelve array con todos los usuarios (objetos) de la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const obtenerJuegos = async () => {
    try {
      const { data, error } = await supabase
        .from('juegos')
        .select('*');
  
      if (error) throw error;
  
      return data; // Devuelve el array de juegos
    } catch (err) {
      console.error('Error fetching games:', err);
      throw err;
    }
  };
  

/**
 * Descripción: Esta función muestra a todos los juegos de la tabla juegos
 * @memberof FuncionesJuegos 
 * @method obtenerJuegosNombre
 * @async 
 * @return {Array} Devuelve array con todos los juegos (objetos) de la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const obtenerJuegosNombre = async () => {
    try {
        const { data, error } = await supabase
            .from('juegos')
            .select('*')
            .order('nombre', { ascending: true });

        if (error) throw error;

        return data; 
    } catch (err) {
        console.error('Error fetching games by name:', err);
        throw err;
    }
};


/**
 * Descripción: Esta función muestra a 10 usuarios de la tabla usuarios
 * @memberof FuncionesJuegos 
 * @method obtenerJuegosPaginacion 
 * @async 
 * @return {Array} Devuelve array con los 10 juegos (objetos) de la tabla para paginación
 * @throws {Error} Error de consulta a la BBDD
 */
const obtenerJuegosPaginacion = async (pagina, porPagina) => {
    try {
      const { data, error } = await supabase
        .from('juegos')
        .select('*')
        .range((pagina - 1) * porPagina, pagina * porPagina - 1);
  
      if (error) throw error;
  
      return data;
    } catch (err) {
      console.error('Error fetching games with pagination:', err);
      throw err;
    }
  };
  

/**
 * Descripción: Esta función edita el campo role_name de la tabla Roles
 * @memberof FuncionesJuegos 
 * @method editarDisponibilidad 
 * @async
 * @param {JSON} entry - Un JSON con el nuevo nombre del juego y con la disponibilidad antigua.
 * @return {Integer} Devuelve el número de rows editadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const editarDisponibilidad = async (entry) => {
    const { nombre, disponibilidad } = entry;
    
    try {
      const { data, error } = await supabase
        .from('juegos')
        .update({ disponibilidad })
        .eq('nombre', nombre);
  
      if (error) throw error;
  
      return data.length; // Devuelve el número de juegos actualizados
    } catch (err) {
      console.error('Error updating availability:', err);
      throw err;
    }
  };
  

module.exports = {
    crearJuego,
    borrarJuego,
    obtenerJuegos,
    obtenerJuegosPaginacion,
    editarDisponibilidad,
    obtenerJuegosNombre
}

//PRUEBAS
/* const objJuego =   {
    nombre: 'Catan',
    descripcion: 'Juego de estrategia y comercio.',
    genero: 'Estrategia',
    numero_jugadores_min: 3,
    numero_jugadores_max: 4,
    edad_recomendada: 10,
    tiempo_juego: '60-90 minutos',
    video_url: 'https://www.youtube.com/watch?v=N5SljJbSRgc&pp=ygUFY2F0YW4%3D',
    imagen: 'https://i.ebayimg.com/images/g/724AAOSwB-1YyeTu/s-l1200.jpg'
  }

crearJuego(objJuego).then(data=>console.log(data)); */
//borrarJuego('Catan').then(data=>console.log(data));
//obtenerJuegos().then(data=>console.log(data))
/*PRUEBA 2 */
/* const objUpdate = {
    disponibilidad: "true",
    nombre: 'Catan'
}
editarDisponibilidad(objUpdate).then(data=>console.log(data)); */