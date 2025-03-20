"use server";
import twilio from "twilio";
export async function callAction() {
  // Find your Account SID and Auth Token at twilio.com/console
  // and set the environment variables. See http://twil.io/secure
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  async function createCall() {
    console.log("createCall");
    const call = await client.calls.create({
      from: "+12082477196",
      to: "+41786305531",
      twiml: `<Response>
    <Pause length="1"/>
  <Play>https://0gdvtnvfey.ufs.sh/f/jIVaTjix9anHtHqYXWeUutKlNAoOpySP19jfXEJQH3CkGbrh</Play>
</Response>`,
    });

    console.log(call.sid);
  }
  createCall();
}
