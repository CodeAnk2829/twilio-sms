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
  const json = JSON.stringify(req.body);
  const { recipients, messageToBeSent } = JSON.parse(json);
  console.log(recipients)
  console.log(messageToBeSent);


  recipients.forEach((recipient) => {
    client.messages
      .create({
        body: `${messageToBeSent}`,
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
    ok: true
  });
});

app.listen(3000, console.log("Server is running"));
