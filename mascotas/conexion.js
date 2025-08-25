const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // tu usuario
    password: 'Bg7071545',       // tu contraseña
    database: 'mascotas'
});

conexion.connect((err) => {
    if (err) {
        console.error('❌ Error en la conexión:', err);
        return;
    }
    console.log('✅ Conectado a la base de datos "mascotas"');
});

module.exports = conexion;
