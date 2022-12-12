module.exports = (app) => {

    const config = require("../config/config");

    const PORT = process.env.PORT || config.PORT;

    app.listen(PORT, () => {
        console.log(`Eyemed Opticians and Supliers Server Started Listening on Port ${PORT}...`);
    });

}