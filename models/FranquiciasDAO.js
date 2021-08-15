const db = require('../config/database');

//Con esta funcion logue al usuario
function obtenerTodasFranquicias(callback) {

    let sql = "call obtenerTodasFranquicias();";

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
    obtenerTodasFranquicias
}

