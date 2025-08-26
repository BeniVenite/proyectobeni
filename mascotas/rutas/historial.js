const express = require('express');
const router = express.Router();
const conexion = require('../conexion');
const { getNextId } = require('../helpers');

router.get('/plantilla', (req, res) => {
    res.json({ ID_Animal: 0, Fecha: "YYYY-MM-DD", Diagnostico: "", Tratamiento: "" });
});

router.get('/', (req, res) => {
    conexion.query(
        'SELECT * FROM historial_medico WHERE Eliminado = 0',
        (err, filas) => { if(err) return res.status(500).json({ error: err.message }); res.json(filas); }
    );
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query(
        'SELECT * FROM historial_medico WHERE ID_Historial = ? AND Eliminado = 0',
        [id],
        (err, filas) => { if(err) return res.status(500).json({ error: err.message }); res.json(filas[0] || { mensaje: "No encontrado" }); }
    );
});

router.post('/', (req, res) => {
    getNextId('historial_medico', 'ID_Historial', (err, nextId) => {
        if(err) return res.status(500).json({ error: err.message });
        const nuevoHistorial = { ID_Historial: nextId, ...req.body, Eliminado: 0 };
        conexion.query('INSERT INTO historial_medico SET ?', nuevoHistorial, (err) => {
            if(err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Historial agregado', id: nextId });
        });
    });
});

router.put('/:id', (req, res) => {
    conexion.query('UPDATE historial_medico SET ? WHERE ID_Historial = ?', [req.body, req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Historial actualizado correctamente' });
    });
});

router.delete('/:id', (req, res) => {
    conexion.query('UPDATE historial_medico SET Eliminado = 1 WHERE ID_Historial = ?', [req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Historial eliminado correctamente (lógico)' });
    });
});

module.exports = router;
