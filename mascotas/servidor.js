const express = require('express');
const app = express();
const puerto = 3000;

// Importar conexión
const conexion = require('./conexion');

app.use(express.json());

// Función para obtener siguiente ID
function getNextId(tabla, campoId, callback) {
    conexion.query(`SELECT MAX(${campoId}) AS maxId FROM ${tabla}`, (err, result) => {
        if (err) return callback(err, null);
        const nextId = (result[0].maxId || 0) + 1;
        callback(null, nextId);
    });
}

// Pasar conexión y función a routers
app.set('conexion', conexion);
app.set('getNextId', getNextId);

// Importar routers
app.use('/personas', require('./rutas/personas'));
app.use('/animales', require('./rutas/animales'));
app.use('/donaciones', require('./rutas/donaciones'));
app.use('/adopciones', require('./rutas/adopciones'));
app.use('/historial', require('./rutas/historial'));

// Plantillas para llenar campos en front o pruebas
app.get('/plantillas/:tabla', (req, res) => {
    const { tabla } = req.params;

    const plantillas = {
        personas: { Nombre: "", Direccion: "", Telefono: "", Email: "" },
        animales: { Nombre: "", Especie: "", Raza: "", Edad: 0, Estado: "" },
        donaciones: { ID_Persona: 0, Fecha: "YYYY-MM-DD", Monto: 0, Cantidad_Descripcion: "" },
        adopciones: { ID_Persona: 0, ID_Animal: 0, Fecha_Adopcion: "YYYY-MM-DD", Observaciones: "" },
        historial: { ID_Animal: 0, Fecha: "YYYY-MM-DD", Diagnostico: "", Tratamiento: "", Veterinario: "" }
    };

    res.json(plantillas[tabla] || { error: "Tabla no encontrada" });
});

// Iniciar servidor
app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
