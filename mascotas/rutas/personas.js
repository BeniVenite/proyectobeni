const express = require('express');
const router = express.Router();
const conexion = require('../conexion');
const { getNextId } = require('../helpers');

// GET plantilla
router.get('/plantilla', (req, res) => {
    res.json({ Nombre: "", Direccion: "", Telefono: "", Email: "" });
});

// GET todas las personas activas
router.get('/', (req, res) => {
    conexion.query(
        'SELECT ID_Persona, Nombre, Direccion, Telefono, Email FROM personas WHERE Eliminado = 0',
        (err, filas) => { if(err) return res.status(500).json({ error: err.message }); res.json(filas); }
    );
});

// GET persona por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query(
        'SELECT ID_Persona, Nombre, Direccion, Telefono, Email FROM personas WHERE ID_Persona = ? AND Eliminado = 0',
        [id],
        (err, filas) => { if(err) return res.status(500).json({ error: err.message }); res.json(filas[0] || { mensaje: "No encontrado" }); }
    );
});

// POST nueva persona
router.post('/', (req, res) => {
    getNextId('personas', 'ID_Persona', (err, nextId) => {
        if(err) return res.status(500).json({ error: err.message });
        const nuevaPersona = { ID_Persona: nextId, ...req.body, Eliminado: 0 };
        conexion.query('INSERT INTO personas SET ?', nuevaPersona, (err) => {
            if(err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Persona agregada', id: nextId });
        });
    });
});

// PUT actualizar persona
router.put('/:id', (req, res) => {
    conexion.query('UPDATE personas SET ? WHERE ID_Persona = ?', [req.body, req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Persona actualizada correctamente' });
    });
});

// DELETE lógico
router.delete('/:id', (req, res) => {
    conexion.query('UPDATE personas SET Eliminado = 1 WHERE ID_Persona = ?', [req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Persona eliminada correctamente (lógico)' });
    });
});

module.exports = router;
