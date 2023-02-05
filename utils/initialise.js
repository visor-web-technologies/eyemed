module.exports = (app) => {

    const config = require("../config/config");

    const PORT = process.env.PORT || config.PORT;

    const url = process.env.NODE_URL == "production" ? "eymedopticians.com" : `http://127.0.0.2:${PORT}`;

    app.listen(PORT, () => {
        console.log(`Eyemed Opticians application started on ${url}`);
    });

}