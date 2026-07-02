const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// --- RUTAS PÚBLICAS ---
// Registrar un usuario (Cualquiera puede registrarse, idealmente el primero será admin o se le asigna rol 'user' por defecto)
router.post('/register', register);

// Iniciar sesión (Cualquiera puede iniciar sesión)
router.post('/login', login);

// --- RUTAS PROTEGIDAS (Solo Admin) ---
// Obtener todos los usuarios
router.get('/', verifyToken, isAdmin, getUsers);

// Crear un nuevo usuario directamente (como admin)
router.post('/', verifyToken, isAdmin, createUser);

// Actualizar un usuario por ID
router.put('/:id', verifyToken, isAdmin, updateUser);

// Eliminar un usuario por ID
router.delete('/:id', verifyToken, isAdmin, deleteUser);

module.exports = router;
