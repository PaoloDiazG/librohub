// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;


// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(express.json());


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

//Ruta para agregar libros
app.post('/books', (req, res) => {
  const { nombre, autor, categoria, anio, precio } = req.body;

  // Verifica que todos los datos requeridos estén presentes
  if (!nombre || !autor || !categoria || !anio || !precio) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const query = 'INSERT INTO books (nombre, autor, categoria, anio, precio) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [nombre, autor, categoria, anio, precio], (err, result) => {
    if (err) {
      console.error('Error al agregar el libro:', err);
      return res.status(500).json({ error: 'Error al agregar el libro en la base de datos.' });
    }
    // Solo enviar éxito si se insertó una fila
    if (result.affectedRows > 0) {
      res.json({ message: 'Libro agregado correctamente' });
    } else {
      res.status(500).json({ error: 'No se pudo agregar el libro.' });
    }
  });
});

// Ruta para obtener todos los libros
app.get('/books', (req, res) => {
  const query = 'SELECT * FROM books';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los libros:', err);
      return res.status(500).json({ error: 'Error al obtener los libros' });
    }
    res.json(results);
  });
});

// Ruta para obtener libros con búsqueda
app.get('/books', (req, res) => {
  const search = req.query.search || '';
  const query = `
    SELECT * FROM books
    WHERE LOWER(nombre) LIKE LOWER(?)`;

  db.query(query, [`%${search}%`], (err, results) => {
    if (err) {
      console.error('Error al obtener los libros:', err);
      return res.status(500).json({ error: 'Error al obtener los libros' });
    }
    res.json(results);
  });
});

//Ruta para crear una nueva transacción
app.post('/transactions', (req, res) => {
  const { userId, dni, nombre, librosComprados, precioTotal } = req.body;

  const query = `
    INSERT INTO transacciones (user_id, dni, nombre, libros_comprados, precio_total)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [userId, dni, JSON.stringify(nombre), JSON.stringify(librosComprados), precioTotal],
    (err, result) => {
      if (err) {
        console.error('Error al registrar la transacción:', err);
        return res.status(500).json({ error: 'Error al registrar la transacción' });
      }
      res.json({ message: 'Transacción registrada exitosamente' });
    }
  );
});

  // Agregar un libro
app.post('/books', (req, res) => {
    const { nombre, autor, categoria, anio, precio } = req.body;
    const query = 'INSERT INTO books (nombre, autor, categoria, anio, precio) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, autor, categoria, anio, precio], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al agregar el libro' });
      }
      res.json({ message: 'Libro agregado exitosamente' });
    });
  });

  //Libro por ID:
app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM books WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el libro' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json(result[0]);
  });
});

// Actualizar libro
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, autor, categoria, anio: anio, precio } = req.body;
  const query = 'UPDATE books SET nombre = ?, autor = ?, categoria = ?, anio = ?, precio = ? WHERE id = ?';
  db.query(query, [nombre, autor, categoria, anio, precio, id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el libro' });
    }
    res.json({ message: 'Libro actualizado exitosamente' });
  });
});

// Eliminar libro
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM books WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el libro' });
    }
    res.json({ message: 'Libro eliminado exitosamente' });
  });
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
