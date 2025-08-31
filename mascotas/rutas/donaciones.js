const express = require('express');
const router = express.Router();
const conexion = require('../conexion');
const { getNextId } = require('../helpers');

// Plantilla
router.get('/plantilla', (req, res) => {
    res.json({
        ID_Persona: 0, Monto: 0, Fecha: "", Metodo_Pago: "", Comentarios: ""
    });
});

// GET todas las donaciones
router.get('/', (req, res) => {
    conexion.query('SELECT * FROM donaciones', (err, filas) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json(filas);
    });
});

// GET por ID
router.get('/:id', (req, res) => {
    conexion.query('SELECT * FROM donaciones WHERE ID_Donacion = ?', [req.params.id], (err, filas) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json(filas[0] || { mensaje: "No encontrado" });
    });
});

// POST nueva donación
router.post('/', (req, res) => {
    getNextId('donaciones', 'ID_Donacion', (err, nextId) => {
        if(err) return res.status(500).json({ error: err.message });
        const nuevaDonacion = { ID_Donacion: nextId, ...req.body };
        conexion.query('INSERT INTO donaciones SET ?', nuevaDonacion, (err) => {
            if(err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Donación agregada', id: nextId });
        });
    });
});

// PUT actualizar donación
router.put('/:id', (req, res) => {
    conexion.query('UPDATE donaciones SET ? WHERE ID_Donacion = ?', [req.body, req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Donación actualizada correctamente' });
    });
});

// DELETE físico
router.delete('/:id', (req, res) => {
    conexion.query('DELETE FROM donaciones WHERE ID_Donacion = ?', [req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Donación eliminada correctamente' });
    });
});

module.exports = router;
