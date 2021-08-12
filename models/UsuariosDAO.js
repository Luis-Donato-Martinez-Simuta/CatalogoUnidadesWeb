const db = require('../config/database');

//Con esta funcion obtengo todas las unidades en la base de datos
function logueo(username ,password,callback) {
    console.log("User:" + username +" pas: "+ password)
    let sql = "call logueo('"+username+"','"+password+"');";
    //console.log(sql);
    db.query(sql, (err, data) => {
        if (err) {
            throw err
        };
        if (data.length > 0) {
            //console.log('Desde logueo: ' + data[0][0]);
            return callback(data[0][0]);
        };

        return callback(null);
    });
}

module.exports = {
    logueo
}

