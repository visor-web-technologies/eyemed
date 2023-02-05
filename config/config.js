<<<<<<< HEAD
module.exports = {
    PORT: 3000,
    db : process.env.MONGODB_URI,
    senderEmail : process.env.senderEmail,
    senderEmailPass : process.env.sendErmailPass,
    senderEmailS : process.env.senderEmailS,
    senderEmailPassS: process.env.senderEmailPassS
=======
const getConnectionString = require("../utils/mongodb");

module.exports = {
    db : getConnectionString(),
    email: {
        username: "eyemed.dev@gmail.com",
        password: "####################"
    },
    senderEmail : "enquiries@eyemedopticians.com",
    senderEmailPass : "GeneralEnq2021!",
    senderEmailS : "suppliers@eyemedopticians.com",
    senderEmailPassS: "EyemedWholesale2021!",
    PORT: 3000,
    CLIENT_ID: "653145893378-9020p05cjd4l8fglp2lc1nh3grn7v4f3.apps.googleusercontent.com",
    CLIENT_SECRET: "NlXc7eZWX6Ok24Z1va9L55st",
    REDIRECT_URI: "https://developers.google.com/oauthplayground",
    REFRESH_TOKEN: "1//04iE2C5vMg9QwCgYIARAAGAQSNwF-L9Irh7xn9JgUMFGh9Ht70uMhSUyCibnldfIZdejnHo0hcRiPNlo60m-0MdYCo57kvZvgS0s",
    ACCESS_TOKEN_1: "ya29.a0ARrdaM9WWxyGUJMa7HttiZbDpraA_1_C1Rch75-IOj1w4eyAtQlrNktXJZPoNmzuBb4SM49HIoWEjhhQZggPTqEqBWKFLmrNZoUsU6GFclyAzjZiFixiq-CCE-JE0lBbeJbrNEFF1ILOR4ljDaJLpTSA4fUQ"
>>>>>>> e232921c2bb7a206421a35f7b976b8d3aeafb7bb
}
