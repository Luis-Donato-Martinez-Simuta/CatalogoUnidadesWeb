
const db = require('../config/database');

//Con esta funcion logue al usuario
function obtenerTodasEmpresas(callback) {

    let sql = "call obtenerTodasEmpresas();";

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

function obtenerEmpresaPorId(IdEmpresa,callback) {
    console.log("id empresa uno: "+ IdEmpresa)

    let sql = "call obtenerEmpresaPorId("+IdEmpresa+");";

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
    obtenerTodasEmpresas,
    obtenerEmpresaPorId
}



