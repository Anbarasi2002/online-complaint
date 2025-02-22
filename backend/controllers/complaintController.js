const { sendComplaintmail, sendComplainststustmail } = require('../middleware/email');
const Complaint = require('../models/Complaint');
const User = require('../models/User');

// Create a new complaint
exports.createComplaint = async (req, res) => {
    const { vin, make, model, color, theftDate, location } = req.body;
    console.log({ vin, make, model, color, theftDate, location });


    try {
        const complaint = new Complaint({
            vehicleDetails: { vin, make, model, color },
            theftDate,
            location,
            userId: req.user.id,
            vehicleImage: req.file ? req.file.path : null, // Save file path if uploaded
            status: 'Registered'
        });
        await complaint.save();
        const user = await User.findById(req.user.id);
        const useremail = user.email;
        sendComplaintmail(useremail, complaint)
        const users = await User.find({ role: { $in: ["admin", "police"] } })
            .select("name email role")
            .lean();
        users.map(user => {
            sendComplaintmail(user.email, complaint)
        })

        res.status(201).json({ message: 'Complaint registered successfully', complaint });
    } catch (error) {
        res.status(500).json({ message: 'Error registering complaint', error: error.message });
    }
};

// Get all complaints for a user
exports.getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving complaints', error: error.message });
    }
};

// Get details of a specific complaint
exports.getComplaintDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving complaint details', error: error.message });
    }
};

exports.getuserComplaintDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const complaint = await Complaint.find({ userId: id });
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving complaint details', error: error.message });
    }
};

exports.updateComplaintStatus = async (req, res) => {
    const { id } = req.params; // Extract complaint ID
    const { status } = req.body; // Extract new status from request body

    try {
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        // Update status if a valid value is provided
        if (status && ['Registered', 'Under Investigation', 'Resolved'].includes(status)) {
            complaint.status = status;
            await complaint.save();

           

            const user = await User.findById(complaint.userId);

            const useremail=user.email

            console.log(useremail);
            
            
            sendComplainststustmail(useremail,complaint,user.username,status)


            return res.status(200).json({ message: 'Complaint status updated', complaint });
        } else {
            return res.status(400).json({ message: 'Invalid status value' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating complaint status', error: error.message });
    }
};


