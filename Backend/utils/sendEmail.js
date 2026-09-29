const nodemailer = require("nodemailer");

const sendEmail = async ({email, subject, text }) => {
    try {
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

const mailOption = {
    from: `"ShoppingBaazi Support" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: subject,
    text: text,
};

  await transporter.sendMail(mailOption);
  console.log(`Email sent successfully to ${email}`);
    }
     catch (error) {
        console.error("Failed to send email to ${email} ", error.message);
    }
}

module.exports = sendEmail;