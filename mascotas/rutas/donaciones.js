const express = require('express');
const router = express.Router();
const conexion = require('../conexion');
const { getNextId } = require('../helpers');

router.get('/plantilla', (req, res) => {
    res.json({ ID_Persona: 0, Fecha: "YYYY-MM-DD", Monto: 0, Descripcion: "" });
});

router.get('/', (req, res) => {
    conexion.query(
        'SELECT * FROM donaciones WHERE Eliminado = 0',
        (err, filas) => { if(err) return res.status(500).json({ error: err.message }); res.json(filas); }
    );
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query(
        'SELECT * FROM donaciones WHERE ID_Donacion = ? AND Eliminado = 0',
        [id],
        (err, filas) => { if(err) return res.status(500).json({ error: err.message }); res.json(filas[0] || { mensaje: "No encontrado" }); }
    );
});

router.post('/', (req, res) => {
    getNextId('donaciones', 'ID_Donacion', (err, nextId) => {
        if(err) return res.status(500).json({ error: err.message });
        const nuevaDonacion = { ID_Donacion: nextId, ...req.body, Eliminado: 0 };
        conexion.query('INSERT INTO donaciones SET ?', nuevaDonacion, (err) => {
            if(err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Donación agregada', id: nextId });
        });
    });
});

router.put('/:id', (req, res) => {
    conexion.query('UPDATE donaciones SET ? WHERE ID_Donacion = ?', [req.body, req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Donación actualizada correctamente' });
    });
});

router.delete('/:id', (req, res) => {
    conexion.query('UPDATE donaciones SET Eliminado = 1 WHERE ID_Donacion = ?', [req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Donación eliminada correctamente (lógico)' });
    });
});

module.exports = router;
