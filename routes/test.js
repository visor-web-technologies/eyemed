const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("test");
});

// exports
module.exports = router;