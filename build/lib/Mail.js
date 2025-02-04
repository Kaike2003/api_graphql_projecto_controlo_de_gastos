"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const configMail_1 = require("../config/mail/configMail");
exports.default = nodemailer_1.default.createTransport(configMail_1.configMail);
