const db = require('../config/database');

//Con esta funcion logue al usuario
function logueo(username ,password,callback) {

    let sql = "call logueo('"+username+"','"+password+"');";

    db.query(sql, (err, data) => {
        if (err) {
            throw err
        };
        if (data.length > 0) {
            return callback(data[0][0]);
        };

        return callback(null);
    });
}

function obtenerUsuarioPorId(IdUsuario,callback) {

    let sql = "call obtenerUsuarioPorId("+IdUsuario+");";

    db.query(sql, (err, data) => {
        if (err) {
            throw err
        };
        if (data.length > 0) {
            return callback(data[0][0]);
        };

        return callback(null);
    });
}

function obtenerTodosUsuarios(callback) {

    let sql = "call obtenerTodosUsuarios();";

    db.query(sql, (err, data) => {
        if (err) {
            throw err
        };
        if (data.length > 0) {
            return callback(data[0]);
        };

        return callback(null);
    });
}



module.exports = {
    logueo,
    obtenerUsuarioPorId,
    obtenerTodosUsuarios
}

