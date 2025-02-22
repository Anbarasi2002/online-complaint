const express = require('express');
const { poliiceStatus } = require('../controllers/policecontroller');
const { getComplaintDetails } = require('../controllers/complaintController');


const router = express.Router();

// Route for user registration
router.get('/status',poliiceStatus );

//getComplaintDetails

router.get("/cases/:id",getComplaintDetails)


module.exports = router;