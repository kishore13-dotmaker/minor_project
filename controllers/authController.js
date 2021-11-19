const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const authStringConstant = require('../constants/strings')
const httpStatusCode = require('../constants/httpStatusCodes')
const User = require('../models/user')
const authActions = {
    // Ping route
    pingRoute: async function (req, res) {
        res.status(httpStatusCode.OK).send({
            success: true,
            message: StringConstant.SUCCESSFUL_PING,
        })
    },
    newStudent: async function (req, res) {
        console.log(req.body)
        User.register({
            name: req.body.name,
            registerNo: req.body.registerNo,
            username: req.body.username,
            yearofStudy:req.body.yearofStudy,
        },
            req.body.password,
            function (err, user) {
                if (err) {
                    console.log(err);
                    res.send("not registered");
                } else {
                    passport.authenticate("local")(req, res, function () {
                        res.send("registered");
                    });
                }
            }
        );
    }, StudentLogin:  function (req, res) {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        req.login(user,  function (err) {
            if (err) {
                console.log(err);
                res.send("not logged in ")
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.send("logged in");
                })
            }
        });
    },
    newStudentGetRoute: function (req,res){
        res.render("admin-newstud")

    },
    loginStudentGetRoute:function (req,res){
        res.render("login")

    },
    // Unidentified route
    errorPageRoute: async function (req, res) {
        res.status(httpStatusCode.NOT_FOUND).json({
            success: 'false',
            message: StringConstant.PAGE_NOT_FOUND
        })
    },
}




module.exports = authActions
