// Import required packages
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load .env file contents

const app = express();
app.use(express.json());

// Create a transporter using credentials from the .env file
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use the email from .env
        pass: process.env.EMAIL_PASS // Use the password from .env
    }
});

// Endpoint to send email
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Send email to your address
        subject: `Message from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
