const express = require('express');
const router = express.Router();
const conexion = require('../conexion');
const { getNextId } = require('../helpers');

// Plantilla
router.get('/plantilla', (req, res) => {
    res.json({
        Nombre: "", Apellido: "", CI: "", Fecha_Nacimiento: "", Genero: "",
        Direccion: "", Telefono: "", Email: "", Rol: "Adoptante"
    });
});

// GET todas las personas
router.get('/', (req, res) => {
    conexion.query('SELECT * FROM personas', (err, filas) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json(filas);
    });
});

// GET por ID
router.get('/:id', (req, res) => {
    conexion.query('SELECT * FROM personas WHERE ID_Persona = ?', [req.params.id], (err, filas) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json(filas[0] || { mensaje: "No encontrado" });
    });
});

// POST nueva persona
router.post('/', (req, res) => {
    getNextId('personas', 'ID_Persona', (err, nextId) => {
        if(err) return res.status(500).json({ error: err.message });
        const nuevaPersona = { ID_Persona: nextId, ...req.body };
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

// DELETE físico
router.delete('/:id', (req, res) => {
    conexion.query('DELETE FROM personas WHERE ID_Persona = ?', [req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Persona eliminada correctamente' });
    });
});

module.exports = router;
