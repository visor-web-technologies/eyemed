// export send mail function
const transport = require("./supplierstransport");
const config = require("../config/config");

//////////////////////////////////////
async function sendMail(order, emailHTML){

  try {
          
  // const emailText = "failed to load email, please contact : 'developers@vvisorweb.agency'"

  const mailOptions = {
      from: config.senderEmailS,
      to: order.email,
      subject: 'Order Summery Email',
      text: "",
      html: emailHTML
  }

  const result = await transport.sendMail(mailOptions);

  return result;
          
  } catch(e) {
    return e;
  }
          
}


// exports 
module.exports = sendMail;