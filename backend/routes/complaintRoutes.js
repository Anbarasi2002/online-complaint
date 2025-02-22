const express = require('express');
const {
    createComplaint,
    getComplaints,
    getComplaintDetails,
    updateComplaintStatus,
    getuserComplaintDetails
} = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');

const router = express.Router();

// Route to create a new complaint
router.post('/', protect, upload.single('vehicleImage'), createComplaint);

// Route to get all complaints
router.get('/', protect, getComplaints);

// Route to get details of a specific complaint
router.get('/:id', protect, getuserComplaintDetails);

router.get('/specific/:id', protect, getComplaintDetails);
// Route to update the status of a complaint
router.put('/:id/status', protect, updateComplaintStatus);

module.exports = router;