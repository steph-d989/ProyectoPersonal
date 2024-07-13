const queriesUsuarios = {

    crearUsuario: `INSERT INTO 
    usuarios (nombre, email, pass_hash, rol)
    VALUES
        ($1,$2,$3,$4)`
}

module.exports = queriesUsuarios;