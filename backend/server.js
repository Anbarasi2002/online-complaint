const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const policeRoutes = require('./routes/policeroutes');
const complaintRoutes = require('./routes/complaintRoutes');
const { errorHandler } = require('./middleware/authMiddleware');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Database connection
connectDB()


console.log(process.env.EMAIL,process.env.PASSWORD);
    

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use("/api/admin",adminRoutes)
app.use("/api/police",policeRoutes)

// Error handling middleware
// app.use(errorHandler);/police/cases/

app.use('/uploads', express.static('uploads'));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});