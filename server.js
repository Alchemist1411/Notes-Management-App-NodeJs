const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const notesRoutes = require('./src/routes/notesRoutes');
const searchRoutes = require('./src/routes/searchRoutes');
const rateLimiter = require('./src/middleware/rateLimiter');
const throttle = require('./src/middleware/throttling');


const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Connection --> For testing purposes only
mongoose.connect('mongodb+srv://deepak123:alchemist123@100xdevs.pndby2g.mongodb.net/UserNotesDb');

app.use(express.json());


// Global Request throttling middleware
app.use(throttle);

// Routes
// Authentication routes
app.use('/api/auth', authRoutes);

//Global rate Limiter middleware
app.use(rateLimiter);

// Notes routes
app.use('/api/notes', notesRoutes);

// Search routes
app.get('/api/search', searchRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
