/* eslint-disable @typescript-eslint/no-unused-vars */
const config = require("../config");
const logger = require("../config/winston");
const AppError = require("./appError");

const nodemailer = require("nodemailer");
const { MailOptions } = require("nodemailer/lib/sendmail-transport");

exports.sendEmail = async (message) => {
  console.log(config.fromEmailAddress, config.password);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.fromEmailAddress,
      pass: config.password,
    },
  });

  try {
    await transporter.sendMail(message);
    console.log("message sent");
  } catch (error) {
    logger.error(error);
  }
};
