const express = require('express');
const mysql = require('mysql2');
const app = express();

const puerto = 3000;

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'mascotas'
});

conexion.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

app.get('/adopciones', (req, res) => {
    let sql = 'SELECT * FROM adopciones';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error("Error en la consulta:", err);
            res.status(500).send('Error en la consulta a la base de datos');
            return;
        }
        res.json(result);
    });
});
app.get('/animales', (req, res) => {
    let sql = 'SELECT * FROM animales';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error("Error en la consulta:", err);
            res.status(500).send('Error en la consulta a la base de datos');
            return;
        }
        res.json(result);
    });
});
app.get('/donaciones', (req, res) => {
    let sql = 'SELECT * FROM  donaciones';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error("Error en la consulta:", err);
            res.status(500).send('Error en la consulta a la base de datos');
            return;
        }
        res.json(result);
    });
});
app.get('/historial_medico', (req, res) => {
    let sql = 'SELECT * FROM historial_medico';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error("Error en la consulta:", err);
            res.status(500).send('Error en la consulta a la base de datos');
            return;
        }
        res.json(result);
    });
});

app.get('/personas', (req, res) => {
    let sql = 'SELECT niobre ,apellido FROM personas';
    conexion.query(sql, (err, result) => {
        if (err) {
            console.error("Error en la consulta:", err);
            res.status(500).send('Error en la consulta a la base de datos');
            return;
        }
        res.json(result);
    });
});

app.listen(puerto, () => {
    console.log(`Servidor levantado en http://localhost:${puerto}`);
});