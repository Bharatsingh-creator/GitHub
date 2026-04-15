const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text,html) => {
    console.log("USER:", process.env.EMAIL_USER);
    console.log("PASS:", process.env.EMAIL_PASS);
  try {
    console.log("📩 Sending email to:", to);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"DevSync" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    });

    console.log("Email sent successfully");
  
  } catch (error) {
    console.error("Email error:", error.message);
  }
};

module.exports = sendEmail;
