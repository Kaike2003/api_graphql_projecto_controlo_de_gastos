import nodemailer from "nodemailer";
import { configMail } from "../config/mail/configMail";

export default nodemailer.createTransport(configMail);
