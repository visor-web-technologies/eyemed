const nodemailer = require("nodemailer");
const config = require("../config/config");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: config.senderEmail,
    pass: config.senderEmailPass,
  },
});

module.exports = transporter;