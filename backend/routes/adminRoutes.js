const express = require('express');
const { getallusers } = require('../controllers/authController');

const router = express.Router();

// Route for user registration
router.get('/users', getallusers);


module.exports = router;