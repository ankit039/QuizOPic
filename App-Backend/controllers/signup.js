var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//models for db
const User = require("../models/usermodel");
const Question = require("../models/questionmodel");

exports.signup = (token, req, res, next) => {
  if (token == false) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.json([
      { sucess: false, msg: "Haven't Recived the Enrollment Number as Body" },
    ]);
    return;
  } else {
    User.findOne({ enrno: req.body.enrno })
      .then(
        (user) => {
          //
          bcrypt.hash(req.body.password, 8, function (err, hash) {
            if (err) {
              throw err;
            } else {
              const signupData = {
                name: req.body.name,
                enrno: req.body.enrno,
                password: hash,
              };
              User.create(signupData)
                .then(
                  (data) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json([
                      {
                        sucess: true,
                        name: data.name,
                        enrno: data.enrno,
                        curscore: data.curscore,
                        token: token,
                      },
                    ]);
                  },
                  (err) => {
                    if (err.keyValue.name != null) {
                      res.statusCode = 400;
                      res.setHeader("Content-Type", "application/json");
                      res.json([
                        {
                          sucess: false,
                          msg:
                            "User Already Exists either with Name- " +
                            req.body.name,
                        },
                      ]);
                    } else if (err.keyValue.enrno != null) {
                      res.statusCode = 400;
                      res.setHeader("Content-Type", "application/json");
                      res.json([
                        {
                          sucess: false,
                          msg:
                            "User Already Exists either with Enrollment- " +
                            req.body.enrno,
                        },
                      ]);
                    }
                  }
                )
                .catch((err) => next(err));
            }
          });
        },
        (err) => next(err)
      )
      //.then()
      .catch((err) => next(err));
  }
};
