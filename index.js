const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const confessionRoutes = require('./routes/confessions');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/confessions', confessionRoutes);
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API Confessy by Kevy 🚀');
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connecté à MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`🚀 Serveur backend démarré sur le port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ Erreur de connexion à MongoDB:', err);
});
