const Complaint = require("../models/Complaint");




exports.poliiceStatus =async (req, res) => {
    try {
        const totalCases = await Complaint.countDocuments();
        const activeCases = await Complaint.countDocuments({ status: "Under Investigation" });
        const resolvedCases = await Complaint.countDocuments({ status: "Resolved" });
        const reports = totalCases; // Assuming reports = total complaints

        res.json({ totalCases, activeCases, resolvedCases, reports });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
}