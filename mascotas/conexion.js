const mysql = require('mysql2');

// Configuración de la conexión a tu base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',            // Tu usuario MySQL
    password: 'Bg7071545',   // Tu contraseña MySQL
    database: 'mascotas'     // Nombre de la base de datos
});

// Conectar a la base de datos
conexion.connect(err => {
    if (err) {
        console.error('❌ Error en la conexión a la base de datos:', err);
        return;
    }
    console.log('✅ Conectado a la base de datos "mascotas"');
});

module.exports = conexion;
