module.exports = {
    PORT: 3000,
    db : process.env.MONGODB_URI,
    senderEmail : process.env.senderEmail,
    senderEmailPass : process.env.sendErmailPass,
    senderEmailS : process.env.senderEmailS,
    senderEmailPassS: process.env.senderEmailPassS
}
