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
    console.log("calling marco");
    const call = await client.calls.create({
      from: "+12082477196",
      to: "+41765065088",
      // to: "+41765925584",
      // to: "+41786305531",
      // to: "+41791996708",
      twiml: `<Response>
    <Pause length="2"/>
   <Play>https://0gdvtnvfey.ufs.sh/f/jIVaTjix9anHvdWr3SNM0IxcwkD9foUjQKuR12SEBy4rgLdH</Play> 
      <Pause length="15"/>
</Response>`,
    });

    console.log(call.sid);
  }
  createCall();
}
