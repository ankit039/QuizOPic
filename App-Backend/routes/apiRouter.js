/*
data need to send on loginroute
{ "username": "_ANKIT_", "password":"password"}
*/
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

//jwt token
const auth = require("../auth_jwt");

//models for db
const User = require("../models/usermodel");
const Question = require("../models/questionmodel")

const loginRouter = express.Router();
loginRouter.use(bodyParser.json());

loginRouter.route("/").get((req, res, next) => {
  Logins.findOne({ username: req.body.username })
    .then(
      (user) => {
        const hashpw = user.password;
        bcrypt.compare(req.body.password, hashpw, function (err, result) {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
            return;
          }
          if (result != true) {
            res.json({ msg: "Incorrect Password" });
          } else {
            portalcheck.verifyGroupUser(req.body.username).then(function (ans) {
              if (ans == "found") {
                var token = authenticate.getToken({ username: user.username });
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                var arr = [
                  { name: user.username, _id: user._id, token: token },
                ];
                res.json(arr);
              } else {
                res.json({ msg: "user is not in the group" });
              }
            });
          }
        });
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

module.exports = loginRouter;
