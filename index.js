const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');

dotenv.config();
// Asegura que `globalThis.crypto` exista (soluciona errores en algunos entornos)
if (typeof globalThis.crypto === 'undefined') {
	try {
		globalThis.crypto = require('crypto');
	} catch (err) {
		console.warn('No se pudo establecer globalThis.crypto:', err);
	}
}
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
