const router = require("express").Router();
const User = require("../models/user");
const async = require("async");
const crypto = require("crypto");
const transporter = require("../utils/transport");
const { isLoggedOut } = require("../middleware/authentication");


// forgot password page
router.get("/", isLoggedOut, (req, res) => {
    res.render("users/forgot");
});

// post to reset password
router.post('/', isLoggedOut, function (req, res, next) {
    async.waterfall([  

        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },

        function (token, done) {
            User.findOne({
                username: req.body.email
            }, function (err, user) {
                if (! user) {
                    // req.flash('error', 'No account with that email address exists.');
                    console.log(`No account with the email address ${req.body.email} exists.`);
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    if (!err) {
                        done(null, token, user);
                    }
                });
            });
        },

        function (token, user, done) {
            var mailOptions = {
                to: user.username,
                from: 'hello@daccordinspections.com',
                subject: `D'accord website admin password reset`,
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + 'http://' + req.headers.host + '/reset/' + token + '\n\n' + 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transporter.sendMail(mailOptions, function (err) {
                // req.flash('info', 'An e-mail has been sent to ' + user.username + ' with further instructions.');
                if (err) {
                    console.log(err);
                } else {
                    console.log('An e-mail has been sent to ' + user.username + ' with further instructions.')
                    done(null, 'done');
                }
            });
        }

    ], function (err) {
        if (err) 
            return next(err);
    
        res.redirect('/');
    });
});


// 
module.exports = router;