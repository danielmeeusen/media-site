// This project uses the nodemailer library to send email
// However, it is recommended to switch over to dedicated email services
// like Mailgun, AWS SES, etc.
import nodemailer from 'nodemailer';

const nodemailerConfig = process.env.NODEMAILER_CONFIG
  ? JSON.parse(process.env.NODEMAILER_CONFIG)
  : {};

const transporter = nodemailer.createTransport(nodemailerConfig);

export async function sendMail({ from, to, subject, text, html, replyTo }) {
  try {
    await transporter.sendMail({
      from,
      to,
      replyTo,
      subject,
      html,
      text,
    });
  } catch (e) {
    throw new Error(e);
  }
}

export const CONFIG = {
  from: process.env.EMAIL,
};
