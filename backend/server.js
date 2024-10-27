// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Asegúrate de tener este archivo configurado

const app = express();
const PORT = 5000;
// Middleware
app.use(cors({ origin: '*' })); // Permitir todas las solicitudes de origen cruzado (solo para pruebas)
app.use(bodyParser.json());

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
  const { dni, email, password, lastName, firstName, gender, birthDate } = req.body;

  // Consulta SQL para insertar un nuevo usuario
  const query = `
    INSERT INTO users (dni, email, password, last_name, first_name, gender, birth_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [dni, email, password, lastName, firstName, gender, birthDate], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }
    res.status(201).json({ message: 'Usuario registrado con éxito', user: req.body });
  });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = `
    SELECT * FROM users WHERE email = ? AND password = ?
  `;

  db.query(query, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
    if (results.length > 0) {
      const user = results[0];
      return res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } else {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }
  });
});

// Ruta para obtener los datos de un usuario específico por ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los datos del usuario' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(results[0]);
  });
});

// Ruta para actualizar los datos de un usuario por ID
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { last_name, first_name, gender, birth_date } = req.body;

  const query = `
    UPDATE users
    SET last_name = ?, first_name = ?, gender = ?, birth_date = ?
    WHERE id = ?
  `;

  db.query(query, [last_name, first_name, gender, birth_date, userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar los datos del usuario' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Datos actualizados correctamente' });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
