const conexion = require('./conexion');

function getNextId(tabla, campoId, callback) {
    conexion.query(`SELECT MAX(${campoId}) AS maxId FROM ${tabla}`, (err, result) => {
        if (err) return callback(err, null);
        const nextId = (result[0].maxId || 0) + 1;
        callback(null, nextId);
    });
}

module.exports = { getNextId };
