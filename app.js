//jshint esversion:6
require("dotenv").config();
const express                   = require("express");
const ejs                       = require("ejs");
const mongoose                  = require('mongoose');
const session                   = require("express-session");
var expressValidator            = require('express-validator');
var MongoStore                  = require("connect-mongo");
//
const cookieParser              = require("cookie-parser");
const flash                     = require("connect-flash");
//
const app                       = express();
//
const initialiseApp             = require("./utils/initialise");
const config                    = require("./config/config");

//
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser("randomsecretstringforcookieparsernajndwieh23iodjhfvbbjdfhiwbuieiucbkjbsdhh"));
app.use(session({
    secret: "jsdhhsfbkjabfjkdfkjakdjsvjfkasdjfhsdfhkalshfkahsdkfk",
    cookie: {
        maxAge: 60000
    },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

const MONGODB_URI = config.db;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
  }, () => {
    console.log(`Connected to database`);
  });

//  useUnifiedTopology: true,
const db = config.db;
mongoose.connect(db, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
  }, () => {
    console.log(`Connected to database, url: ${db}`);
  }
);

// Express sessions midleware
app.use(
    session({
      secret: 'eyemedopticians-random-34RIWOENFIIUOB43F3OBI4B',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: MONGODB_URI
      }),
      coookie: { secure: true }
    })
);

// Express Validator middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        isImage: function (value, filename) {
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case '.png':
                    return '.png';
                case '':
                    return '.jpg';
                default:
                    return false;
            }
        }
    }
}));

// Express Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//
app.use("/pdf", require("./routes/pdf"));
app.use("/cart", require("./routes/cart"));
app.use("/blog", require("./routes/blog"));
app.use("/order", require("./routes/order"));
app.use("/privacy-policy", require("./routes/privacy"));
app.use("/contact", require("./routes/contact"));
app.use("/products", require("./routes/products"));
app.use("/wholesale", require("./routes/wholesaleproducts"));
app.use("/", require("./routes/index"));

//
initialiseApp(app);