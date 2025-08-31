const express = require('express');
const cors = require('cors'); // <-- importar cors
const app = express();
const puerto = 3000;

// Middlewares
app.use(express.json());
app.use(cors()); // <-- habilitar CORS para todas las rutas

// Importar routers
const animalesRouter = require('./rutas/animales');
const personasRouter = require('./rutas/personas');
const adopcionesRouter = require('./rutas/adopciones');
const donacionesRouter = require('./rutas/donaciones');
const historialRouter = require('./rutas/historial');

// Montar routers
app.use('/animales', animalesRouter);
app.use('/personas', personasRouter);
app.use('/adopciones', adopcionesRouter);
app.use('/donaciones', donacionesRouter);
app.use('/historial', historialRouter);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('API PetCare Plus funcionando 🚀');
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
