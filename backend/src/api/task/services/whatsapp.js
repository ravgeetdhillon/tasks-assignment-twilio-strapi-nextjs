const twilio = require("twilio");

module.exports = {
  sendWhatsappMessage({ to, body }) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new twilio(accountSid, authToken);

    client.messages
      .create({
        from: "whatsapp:+14155238886",
        body: body,
        to: `whatsapp:${to}`,
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.error(err));
  },
};
