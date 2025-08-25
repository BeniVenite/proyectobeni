const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

router.get('/', (req, res) => {
    conexion.query('SELECT * FROM adopciones', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

router.post('/', (req, res) => {
    conexion.query('INSERT INTO adopciones SET ?', req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Adopción agregada', id: result.insertId });
    });
});

router.put('/:id', (req, res) => {
    conexion.query('UPDATE adopciones SET ? WHERE ID_Adopcion = ?', [req.body, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Adopción actualizada correctamente' });
    });
});

router.delete('/:id', (req, res) => {
    conexion.query('DELETE FROM adopciones WHERE ID_Adopcion = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Adopción eliminada correctamente' });
    });
});

module.exports = router;
