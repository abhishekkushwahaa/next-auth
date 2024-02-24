"use strict";
import nodemailer from "nodemailer";
import Env from "./env";

const transporter = nodemailer.createTransport({
  host: Env.SMTP_HOST,
  port: Env.SMTP_PORT,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: Env.SMTP_USER,
    pass: Env.SMTP_PASSWORD,
  },
});

// To send an email
export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: Env.SMTP_FROM,
      to: to,
      subject: subject,
      html: html,
    });
  } catch (error) {
    console.error("Error sending email", error);
  }
};
