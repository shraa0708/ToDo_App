import nodemailer from "nodemailer";

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sgbhosale061@gmail.com", // Replace with your Gmail
        pass: "pjnn xyop xflw egok", // Use App Password if 2FA is enabled
    },
});

/**
 * Send email function
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Email body
 */
export const sendEmail = async(to, subject, text) => {
    try {
        await transporter.sendMail({
            from: '"ToDo App" <your-email@gmail.com>',
            to,
            subject,
            text,
        });
        console.log(`✅ Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Email sending failed:", error);
    }
};