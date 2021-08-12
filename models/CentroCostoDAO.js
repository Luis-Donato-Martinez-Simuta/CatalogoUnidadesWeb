const db = require('../config/database');

function obtenerTodasUnidades(callback) {
    let sql = "call obtenerTodasUnidades()";
    console.log(sql);
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

module.exports = {
    obtenerTodasUnidades
}

