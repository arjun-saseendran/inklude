import twilio from "twilio";
import dontenv from "dotenv";
dontenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(accountSid, authToken);

export const client = twilio(accountSid, authToken);
export const twilioPhone = process.env.TWILIO_PHONE;
