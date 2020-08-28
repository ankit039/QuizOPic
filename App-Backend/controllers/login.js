var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//models for db
const User = require("../models/usermodel");
const Question = require("../models/questionmodel");

exports.login = (token, req, res, next) => {
  if (token == false) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.json([
      { sucess: false, msg: "Haven't Recived the Enrollment Number as Body" },
    ]);
    return;
  } else {
    //true
    User.findOne({ enrno: req.body.enrno })
      .then(
        (user) => {
          const hashpw = user.password;
          bcrypt.compare(req.body.password, hashpw, function (err, result) {
            if (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.json({ sucess: false, msg: err });
              return;
            }
            if (result != true) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json([{ sucess: false, msg: "Incorrect Password" }]);
            } else {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json([
                {
                  sucess: true,
                  name: user.name,
                  enrno: user.enrno,
                  curscore: user.curscore,
                  msg: token,
                },
              ]);
            }
          });
        },
        (err) => next(err+"54")
      )
      .catch((err) => {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json([
          {
            sucess: false,
            msg:
              "No User Exists with Enrollment- " +
              req.body.enrno,
          },
        ]);});
  }
};
