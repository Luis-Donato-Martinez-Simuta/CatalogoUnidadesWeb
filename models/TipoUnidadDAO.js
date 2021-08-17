const db = require('../config/database');

//Con esta funcion logue al usuario
function obtenerTodosTipoUnidad(callback) {

    let sql = "call obtenerTodosTipoUnidad();";

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

function obtenerTipoUnidadPorId(IdTipoUnidad,callback) {
    console.log("id Tipo unidad uno: "+ IdTipoUnidad)

    let sql = "call obtenerTipoUnidadPorId("+IdTipoUnidad+");";

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

module.exports = {
    obtenerTodosTipoUnidad,
    obtenerTipoUnidadPorId

}



