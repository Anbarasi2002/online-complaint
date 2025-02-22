const nodemailer = require('nodemailer');




const generateStatusUpdateEmail = (userName, complaint, status) => {
    return `
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
            
            <h2 style="color: #1976D2; text-align: center;">🚔 Complaint Status Update</h2>
            <p><strong>Hello ${userName},</strong></p>
            
            <p>Your complaint regarding the <b>${complaint.vehicleDetails.make} ${complaint.vehicleDetails.model}</b> 
            (VIN: <b>${complaint.vehicleDetails.vin}</b>) has been updated to: 
            <span style="color: ${status === 'Resolved' ? '#2E7D32' : '#D32F2F'}; font-weight: bold;">
                ${status}
            </span>.
            </p>

            <p>We appreciate your patience and cooperation. If you have any further inquiries, feel free to contact us.</p>

            <br>
            <p>Best Regards,</p>
            <p style="font-weight: bold; color: #D32F2F;">🚓 Police Department</p>
        </div>
    </body>
    </html>
    `;
};



const sendComplaintmail = async(recipientEmail,complaintDetails) => {

    console.log(process.env.EMAIL,process.env.PASSWORD);
    

    try {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "tcfproject212@gmail.com",
                pass:"yupv idzv hebn xxhy",
            }

        })

        const emailcontent = `
            <html>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
                    
                    <h2 style="color: #d32f2f; text-align: center;">🚨 New Vehicle Theft Complaint</h2>
                    <p><strong>Dear Officer/Admin,</strong></p>
                    <p>A new vehicle theft complaint has been registered. Below are the details:</p>

                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="background-color: #f8d7da;">
                            <td style="padding: 10px; font-weight: bold;">Vehicle VIN:</td>
                            <td style="padding: 10px;">${complaintDetails.vehicleDetails.vin}</td>
                        </tr>
                        <tr style="background-color: #ffebee;">
                            <td style="padding: 10px; font-weight: bold;">Make:</td>
                            <td style="padding: 10px;">${complaintDetails.vehicleDetails.make}</td>
                        </tr>
                        <tr style="background-color: #f8d7da;">
                            <td style="padding: 10px; font-weight: bold;">Model:</td>
                            <td style="padding: 10px;">${complaintDetails.vehicleDetails.model}</td>
                        </tr>
                        <tr style="background-color: #ffebee;">
                            <td style="padding: 10px; font-weight: bold;">Color:</td>
                            <td style="padding: 10px;">${complaintDetails.vehicleDetails.color}</td>
                        </tr>
                        <tr style="background-color: #f8d7da;">
                            <td style="padding: 10px; font-weight: bold;">Theft Date:</td>
                            <td style="padding: 10px;">${new Date(complaintDetails.theftDate).toLocaleDateString()}</td>
                        </tr>
                        <tr style="background-color: #ffebee;">
                            <td style="padding: 10px; font-weight: bold;">Location:</td>
                            <td style="padding: 10px;">${complaintDetails.location}</td>
                        </tr>
                        <tr style="background-color: #f8d7da;">
                            <td style="padding: 10px; font-weight: bold;">Complaint Status:</td>
                            <td style="padding: 10px; font-weight: bold; color: #d32f2f;">${complaintDetails.status}</td>
                        </tr>
                    </table>

                    ${complaintDetails.vehicleImage ? `
                    <div style="text-align: center; margin-top: 20px;">
                        <h3>📷 Vehicle Image:</h3>
                        <img src="${complaintDetails.vehicleImage}" alt="Vehicle Image" style="width: 100%; max-height: 300px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
                    </div>` : ''}

                    <p style="margin-top: 20px;">Please take the necessary actions as soon as possible.</p>
                    <p style="color: #d32f2f; font-weight: bold;">🚔 Stay Alert, Stay Safe!</p>

                </div>
            </body>
            </html>
        `;
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: `🚨 New Vehicle Theft Complaint Received`,
            html: emailcontent
        })

        console.log(" email has been sent");

    } catch (error) {
        console.error('Error sending  email:', error);
    }
}

const sendComplainststustmail = async(recipientEmail,complaint,username,status) => {

    console.log(process.env.EMAIL,process.env.PASSWORD);
    

    try {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "tcfproject212@gmail.com",
                pass:"yupv idzv hebn xxhy",
            }

        })

        const emailcontent = generateStatusUpdateEmail(username,complaint,status)
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: `🚨 your complaint status updated`,
            html: emailcontent
        })

        console.log(" email has been sent");

    } catch (error) {
        console.error('Error sending  email:', error);
    }
}




module.exports={sendComplaintmail,sendComplainststustmail}