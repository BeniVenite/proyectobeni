const express = require('express');
const router = express.Router();
const conexion = require('../conexion');
const { getNextId } = require('../helpers');

// Plantilla
router.get('/plantilla', (req, res) => {
    res.json({
        Nombre: "", Especie: "", Raza: "", Sexo: "", Color: "",
        Edad: 0, Peso: 0, Fecha_Ingreso: "", Esterilizado: 0,
        Vacunado: 0, Estado: "", Foto: ""
    });
});

// GET todos los animales
router.get('/', (req, res) => {
    conexion.query('SELECT * FROM animales', (err, filas) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json(filas);
    });
});

// GET por ID
router.get('/:id', (req, res) => {
    conexion.query('SELECT * FROM animales WHERE ID_Animal = ?', [req.params.id], (err, filas) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json(filas[0] || { mensaje: "No encontrado" });
    });
});

// POST nuevo animal
router.post('/', (req, res) => {
    getNextId('animales', 'ID_Animal', (err, nextId) => {
        if(err) return res.status(500).json({ error: err.message });
        const nuevoAnimal = { ID_Animal: nextId, ...req.body };
        conexion.query('INSERT INTO animales SET ?', nuevoAnimal, (err) => {
            if(err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Animal agregado', id: nextId });
        });
    });
});

// PUT actualizar animal
router.put('/:id', (req, res) => {
    conexion.query('UPDATE animales SET ? WHERE ID_Animal = ?', [req.body, req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Animal actualizado correctamente' });
    });
});

// DELETE físico
router.delete('/:id', (req, res) => {
    conexion.query('DELETE FROM animales WHERE ID_Animal = ?', [req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Animal eliminado correctamente' });
    });
});

module.exports = router;
