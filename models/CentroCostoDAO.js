const db = require('../config/database');

//Con esta funcion obtengo todas las unidades en la base de datos
function obtenerTodasUnidades(callback) {
    let sql = "call obtenerTodosCentroCosto()";
    //console.log(sql);
    db.query(sql, (err, data) => {
        if (err) {
            throw err
        };
        if (data.length > 0) {
            //console.log('Desde logueo: ' + data[0][0]);
            return callback(data[0]);
        };

        return callback(null);
    });
}

function obtenerCentroCostoID(IdCentroCosto,callback) {
    console.log("id centro costo uno: "+ IdCentroCosto)

    let sql = "call obtenerCentroCostoID("+IdCentroCosto+");";

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
    obtenerTodasUnidades,
    obtenerCentroCostoID
}

