const express = require('express');
const router = express.Router();
const conexion = require('../conexion');
const { getNextId } = require('../helpers');

router.get('/plantilla', (req, res) => {
    res.json({ Nombre: "", Especie: "", Raza: "", Edad: 0, Estado: "" });
});

router.get('/', (req, res) => {
    conexion.query(
        'SELECT * FROM animales WHERE Eliminado = 0',
        (err, filas) => { if(err) return res.status(500).json({ error: err.message }); res.json(filas); }
    );
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query(
        'SELECT * FROM animales WHERE ID_Animal = ? AND Eliminado = 0',
        [id],
        (err, filas) => { if(err) return res.status(500).json({ error: err.message }); res.json(filas[0] || { mensaje: "No encontrado" }); }
    );
});

router.post('/', (req, res) => {
    getNextId('animales', 'ID_Animal', (err, nextId) => {
        if(err) return res.status(500).json({ error: err.message });
        const nuevoAnimal = { ID_Animal: nextId, ...req.body, Eliminado: 0 };
        conexion.query('INSERT INTO animales SET ?', nuevoAnimal, (err) => {
            if(err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Animal agregado', id: nextId });
        });
    });
});

router.put('/:id', (req, res) => {
    conexion.query('UPDATE animales SET ? WHERE ID_Animal = ?', [req.body, req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Animal actualizado correctamente' });
    });
});

router.delete('/:id', (req, res) => {
    conexion.query('UPDATE animales SET Eliminado = 1 WHERE ID_Animal = ?', [req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Animal eliminado correctamente (lógico)' });
    });
});

module.exports = router;
