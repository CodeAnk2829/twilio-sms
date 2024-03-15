const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const sender = process.env.TWILIO_FROM;

app.post("/notify", async (req, res) => {
  const { recipients } = req.body;

  recipients.forEach((recipient) => {
    client.messages
      .create({
        body: "Hi, Response from twilio-sm render",
        from: sender,
        to: recipient,
      })
      .then((message) => {
        console.log(message.sid);
      })
      .catch(() => {
        throw new Error("error while sending sms");
      });
  });
  return res.json({
    msg: "Message sent successfully"
  });
});

app.listen(3000, console.log("Server is running"));
