// import { sendComplaintmail } from "./middleware/email";
const dotenv = require('dotenv');
dotenv.config();
const { sendComplaintmail } = require("./middleware/email")
const complaintDetails = {
    vehicleDetails: {
        vin: "1HGCM82633A123456",
        make: "Toyota",
        model: "Corolla",
        color: "White"
    },
    theftDate: "2025-02-15T10:30:00Z",
    location: "Chennai, Tamil Nadu, India",
    userId: "65d7a1f7e89c1a0012b34567",
    vehicleImage: "https://via.placeholder.com/400", // Example image URL
    status: "Under Investigation"
};


sendComplaintmail("tcftech11@gmail.com",complaintDetails)