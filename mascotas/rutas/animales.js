const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

// GET
router.get('/', (req, res) => {
    conexion.query('SELECT * FROM animales', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// POST
router.post('/', (req, res) => {
    conexion.query('INSERT INTO animales SET ?', req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Animal agregado', id: result.insertId });
    });
});

// PUT
router.put('/:id', (req, res) => {
    conexion.query('UPDATE animales SET ? WHERE ID_Animal = ?', [req.body, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Animal actualizado correctamente' });
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    conexion.query('DELETE FROM animales WHERE ID_Animal = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Animal eliminado correctamente' });
    });
});

module.exports = router;
