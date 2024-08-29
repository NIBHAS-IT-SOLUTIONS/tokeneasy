
 const twilio = require("twilio");
module.exports= async(req,res,OTP,phonenumber)=>{
    // Or, for ESM: import twilio from "twilio";

    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const servicesid = process.env.TWILIO_SERVICE_SID
   const client = twilio(accountSid, authToken);
     
   
    async function createVerification() {
      const verification = await client.verify.v2
        .services(servicesid)
        .verifications.create({
          channel: "sms",
          FriendlyName: "Quick Token",
          customCode: OTP,
          to: phonenumber, 
        });
    
      res.json(verification);
    }
    
    createVerification();
}