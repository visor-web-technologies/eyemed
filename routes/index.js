const express                 = require("express");
const router                  = express.Router();
const nodemailer              = require("nodemailer");
const { google }              = require("googleapis");
const session                 = require('express-session');
const passport                = require("passport");
const passportLocalMongoose   = require("passport-local-mongoose");
//
const config                  = require("../config/config");
const Testimonial             = require("../models/testimonial");
//
const get_data                = require("../utils/data");
const { getCart }             = require("../utils/cart");

//
router.use(express.urlencoded({extended: true}));
router.use(express.static("public"));


////////////////////////////////////
router.get("/", async (req, res) => {
  
  //
  const cart = getCart(req);
  const testimonials = await Testimonial.find().sort({ createdAt : "desc" });
  const data = await get_data();

  //
  res.render("home", 
    { 
      pageName : "Home",
      testimonials : testimonials,
      data : data,
      cart : cart
    }
  );
  
});

////////////////////////////////////
router.get("/:route", (req, res) => {
  console.log(`404, requested route : ${req.params.route}`);
  // res.send("404");
  res.redirect("back");
});

module.exports = router;