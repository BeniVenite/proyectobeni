const express = require('express');
const router = express.Router();
const conexion = require('../conexion');
const { getNextId } = require('../helpers');

// Plantilla
router.get('/plantilla', (req, res) => {
    res.json({
        ID_Animal: 0, ID_Persona: 0, Fecha_Adopcion: "", Estado: "Pendiente", Comentarios: ""
    });
});

// GET todas las adopciones
router.get('/', (req, res) => {
    conexion.query('SELECT * FROM adopciones', (err, filas) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json(filas);
    });
});

// GET por ID
router.get('/:id', (req, res) => {
    conexion.query('SELECT * FROM adopciones WHERE ID_Adopcion = ?', [req.params.id], (err, filas) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json(filas[0] || { mensaje: "No encontrado" });
    });
});

// POST nueva adopción
router.post('/', (req, res) => {
    getNextId('adopciones', 'ID_Adopcion', (err, nextId) => {
        if(err) return res.status(500).json({ error: err.message });
        const nuevaAdopcion = { ID_Adopcion: nextId, ...req.body };
        conexion.query('INSERT INTO adopciones SET ?', nuevaAdopcion, (err) => {
            if(err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Adopción agregada', id: nextId });
        });
    });
});

// PUT actualizar adopción
router.put('/:id', (req, res) => {
    conexion.query('UPDATE adopciones SET ? WHERE ID_Adopcion = ?', [req.body, req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Adopción actualizada correctamente' });
    });
});

// DELETE físico
router.delete('/:id', (req, res) => {
    conexion.query('DELETE FROM adopciones WHERE ID_Adopcion = ?', [req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Adopción eliminada correctamente' });
    });
});

module.exports = router;
