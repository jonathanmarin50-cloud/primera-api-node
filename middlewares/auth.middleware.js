const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // El token típicamente viene en el header Authorization como "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No hay token, autorización denegada' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Agregar el usuario decodificado a la request para usarlo en siguientes funciones
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' });
    }
};

const isAdmin = (req, res, next) => {
    // Esta función asume que verifyToken se ejecutó antes y req.user existe
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Acceso denegado, se requiere rol de administrador' });
    }
};

module.exports = { verifyToken, isAdmin };
