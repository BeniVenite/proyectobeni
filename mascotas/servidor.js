const express = require('express');
const app = express();
const puerto = 3000;

app.use(express.json());

// Importar routers
const animalesRouter = require('./rutas/animales');
const personasRouter = require('./rutas/personas');
const adopcionesRouter = require('./rutas/adopciones');
const donacionesRouter = require('./rutas/donaciones');
const historialRouter = require('./rutas/historial');

// Montar rutas
app.use('/animales', animalesRouter);
app.use('/personas', personasRouter);
app.use('/adopciones', adopcionesRouter);
app.use('/donaciones', donacionesRouter);
app.use('/historial', historialRouter);

app.get('/', (req, res) => {
    res.send('🐾 API de Mascotas funcionando 🚀');
});

app.listen(puerto, () => {
    console.log(`Servidor en http://localhost:${puerto}`);
});
