const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const [users] = await connection.execute('SELECT * FROM users'); // Usamos 'execute' en lugar de 'query'
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

// Ruta para obtener un usuario por su ID
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const [user] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);
        res.status(200).json(user[0]);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ message: 'Error al obtener usuario por ID' });
    }
});

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    try {
        const { cedula, nombre, apellido, edad, genero, correo, celular, tipoRH } = req.body;
        const sql = 'INSERT INTO users (cedula, nombre, apellido, edad, genero, correo, celular, tipoRH) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        await connection.execute(sql, [cedula, nombre, apellido, edad, genero, correo, celular, tipoRH]);
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

// Ruta para validar un usuario
router.put('/validate/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const sql = 'UPDATE users SET validado = 1 WHERE id = ?';
        await connection.execute(sql, [userId]);
        res.json({ message: 'Usuario validado correctamente' });
    } catch (error) {
        console.error('Error al validar usuario:', error);
        res.status(500).json({ message: 'Error al validar usuario' });
    }
});

module.exports = router;
