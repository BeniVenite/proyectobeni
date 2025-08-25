const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

router.get('/', (req, res) => {
    conexion.query('SELECT * FROM historial_medico', (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

router.post('/', (req, res) => {
    conexion.query('INSERT INTO historial_medico SET ?', req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Historial agregado', id: result.insertId });
    });
});

router.put('/:id', (req, res) => {
    conexion.query('UPDATE historial_medico SET ? WHERE ID_Historial = ?', [req.body, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Historial actualizado correctamente' });
    });
});

router.delete('/:id', (req, res) => {
    conexion.query('DELETE FROM historial_medico WHERE ID_Historial = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Historial eliminado correctamente' });
    });
});

module.exports = router;
