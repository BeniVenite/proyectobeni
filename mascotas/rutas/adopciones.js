const express = require('express');
const router = express.Router();
const conexion = require('../conexion');
const { getNextId } = require('../helpers');

router.get('/plantilla', (req, res) => {
    res.json({ ID_Persona: 0, ID_Animal: 0, Fecha_Adopcion: "YYYY-MM-DD", Estado: "" });
});

router.get('/', (req, res) => {
    conexion.query(
        'SELECT * FROM adopciones WHERE Eliminado = 0',
        (err, filas) => { if(err) return res.status(500).json({ error: err.message }); res.json(filas); }
    );
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    conexion.query(
        'SELECT * FROM adopciones WHERE ID_Adopcion = ? AND Eliminado = 0',
        [id],
        (err, filas) => { if(err) return res.status(500).json({ error: err.message }); res.json(filas[0] || { mensaje: "No encontrado" }); }
    );
});

router.post('/', (req, res) => {
    getNextId('adopciones', 'ID_Adopcion', (err, nextId) => {
        if(err) return res.status(500).json({ error: err.message });
        const nuevaAdopcion = { ID_Adopcion: nextId, ...req.body, Eliminado: 0 };
        conexion.query('INSERT INTO adopciones SET ?', nuevaAdopcion, (err) => {
            if(err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Adopción agregada', id: nextId });
        });
    });
});

router.put('/:id', (req, res) => {
    conexion.query('UPDATE adopciones SET ? WHERE ID_Adopcion = ?', [req.body, req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Adopción actualizada correctamente' });
    });
});

router.delete('/:id', (req, res) => {
    conexion.query('UPDATE adopciones SET Eliminado = 1 WHERE ID_Adopcion = ?', [req.params.id], (err) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Adopción eliminada correctamente (lógico)' });
    });
});

module.exports = router;
