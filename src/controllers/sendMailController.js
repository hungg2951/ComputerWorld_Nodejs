import "dotenv/config";
import nodemailer from "nodemailer";

export const sendMaill = async ({ email, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const message = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: html,
    };
    const result = await transporter.sendMail(message);
    return result;
  } catch (error) {
    console.log("Error sending email:", error);
  }
};
