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

export const sendMaillOrder = async (req, res) => {
  const { email, subject, html } = req.body;
  console.log("sending...");
  
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
    res.status(200).json({
      message: "Email sent successfully",
      data: result,
    });
  } catch (error) {
    console.log("Error sending email:", error);
    res.status(500).json({
      message: "Error sending email",
      error: error.message,
    });
  }
};
