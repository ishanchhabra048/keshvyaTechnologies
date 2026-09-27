import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendInquiryNotification = async (inquiry) => {
  if (!env.SMTP_HOST) return; // Silent skip
  const html = `
    <h2>New Inquiry: ${inquiry.projectType}</h2>
    <p><strong>Name:</strong> ${inquiry.name}</p>
    <p><strong>Email:</strong> ${inquiry.email}</p>
    <p><strong>Company:</strong> ${inquiry.company || 'N/A'}</p>
    <p><strong>Budget:</strong> ${inquiry.budget}</p>
    <p><strong>Message:</strong></p>
    <p>${inquiry.message.replace(/\n/g, '<br/>')}</p>
  `;
  try {
    await transporter.sendMail({
      from: env.MAIL_FROM,
      to: env.MAIL_TO,
      replyTo: inquiry.email,
      subject: `New Inquiry: ${inquiry.name} - ${inquiry.projectType}`,
      html,
    });
  } catch (error) {
    console.error('Mail error:', error.message);
  }
};
