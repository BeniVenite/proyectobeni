const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

router.get('/', (req, res) => {
    conexion.query('SELECT * FROM donaciones', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

router.post('/', (req, res) => {
    conexion.query('INSERT INTO donaciones SET ?', req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Donación agregada', id: result.insertId });
    });
});

router.put('/:id', (req, res) => {
    conexion.query('UPDATE donaciones SET ? WHERE ID_Donacion = ?', [req.body, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Donación actualizada correctamente' });
    });
});

router.delete('/:id', (req, res) => {
    conexion.query('DELETE FROM donaciones WHERE ID_Donacion = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Donación eliminada correctamente' });
    });
});

module.exports = router;
