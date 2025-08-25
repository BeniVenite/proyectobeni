const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

router.get('/', (req, res) => {
    conexion.query('SELECT * FROM personas', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

router.post('/', (req, res) => {
    conexion.query('INSERT INTO personas SET ?', req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Persona agregada', id: result.insertId });
    });
});

router.put('/:id', (req, res) => {
    conexion.query('UPDATE personas SET ? WHERE ID_Persona = ?', [req.body, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Persona actualizada correctamente' });
    });
});

router.delete('/:id', (req, res) => {
    conexion.query('DELETE FROM personas WHERE ID_Persona = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Persona eliminada correctamente' });
    });
});

module.exports = router;
