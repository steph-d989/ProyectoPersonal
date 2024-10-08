const queriesUsuarios = {

    crearUsuario: `INSERT INTO 
    usuarios (nombre, email, pass_hash)
    VALUES
        ($1,$2,$3)`,

    borrarUsuario: `DELETE FROM 
        usuarios 
    WHERE 
        email=$1`,
    
    obtenerUsuarios: `SELECT 
        usuario_id,
        nombre,
        email,
        rol,
        is_logged
    FROM 
        usuarios`,
    
    obtenerUsuariosPaginacion: `SELECT
        usuario_id,
        nombre,
        email,
        rol,
        is_logged
    FROM
        usuarios
    ORDER BY
        nombre
    LIMIT $1 OFFSET $2`,

    obtenerUsuariosEmail: `SELECT 
        usuario_id,
        nombre,
        email,
        rol,
        is_logged
    FROM 
        usuarios
    WHERE
        email=$1`,

    editarPass: `UPDATE
        usuarios
    SET
        pass_hash=$1
    WHERE 
        email=$2`,

    editarRol:`UPDATE
        usuarios
    SET 
        rol=$1
    WHERE 
        email=$2`,
}

module.exports = queriesUsuarios;