const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// Conexión a MySQL
const db = mysql.createPool({
  host: '3306',
  user: 'root',
  password: 'Goryp3Xuz$',
  database: 'ecommerce'
});

// Rate limiting (seguridad básica)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 10 // máximo 10 requests por minuto
});
app.use(limiter);

app.get('/', (req, res) => {
  res.send('API Ecommerce funcionando');
});


// ------------------- ENDPOINTS -------------------

// Usuarios
app.get('/usuarios', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM usuarios');
  res.json(rows);
});

app.get('/usuarios/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

app.post('/usuarios', async (req, res) => {
  const { nombre, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', [nombre, email, hashedPassword]);
  res.json({ message: 'Usuario creado' });
});

app.put('/usuarios/:id', async (req, res) => {
  const { nombre, email } = req.body;
  await db.query('UPDATE usuarios SET nombre=?, email=? WHERE id=?', [nombre, email, req.params.id]);
  res.json({ message: 'Usuario actualizado' });
});

app.delete('/usuarios/:id', async (req, res) => {
  await db.query('DELETE FROM usuarios WHERE id=?', [req.params.id]);
  res.json({ message: 'Usuario eliminado' });
});

// Productos (similar a usuarios)
app.get('/productos', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM productos');
  res.json(rows);
});


// Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

//----------------IMPLEMENTACIÓN DE SEGURIDAD-------------

const { body, validationResult } = require('express-validator');

app.post('/usuarios',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', [nombre, email, hashedPassword]);
    res.json({ message: 'Usuario creado con validación' });
});
