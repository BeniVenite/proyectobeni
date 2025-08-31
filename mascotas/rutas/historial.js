const express = require('express');
const router = express.Router();
const conexion = require('../conexion');
const { getNextId } = require('../helpers');

// Plantilla
router.get('/plantilla', (req, res) => {
    res.json({
        ID_Animal: 0, Fecha: "", Diagnostico: "", Tratamiento: "",
        Veterinario: "", Observaciones: ""
    });
});

// GET todo el historial
router.get('/', (req, res) => {
    conexion.query('SELECT * FROM historial_medico', (err, filas) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json(filas);
    });
});

// GET por ID
router.get('/:id', (req, res) => {
    conexion.query('SELECT * FROM historial_medico WHERE ID_Historial = ?', [req.params.id], (err, filas) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json(filas[0] || { mensaje: "No encontrado" });
    });
});

// POST nuevo historial
router.post('/', (req, res) => {
    getNextId('historial_medico', 'ID_Historial', (err, nextId) => {
        if(err) return res.status(500).json({ error: err.message });
        const nuevoHistorial = { ID_Historial: nextId, ...req.body };
        conexion.query('INSERT INTO historial_medico SET ?', nuevoHistorial, (err) => {
            if(err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Historial agregado', id: nextId });
        });
    });
});

// PUT actualizar historial
router.put('/:id', (req, res) => {
    conexion.query('UPDATE historial_medico SET ? WHERE ID_Historial = ?', [req.body, req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Historial actualizado correctamente' });
    });
});

// DELETE físico
router.delete('/:id', (req, res) => {
    conexion.query('DELETE FROM historial_medico WHERE ID_Historial = ?', [req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Historial eliminado correctamente' });
    });
});

module.exports = router;
