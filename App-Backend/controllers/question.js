var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//models for db
const User = require("../models/usermodel");
const Question = require("../models/questionmodel");

exports.question = (token_enrno, req, res, next) => {
  if (token_enrno != undefined) {
    User.findOne({ enrno: token_enrno })
      .then((user) => {
        //only getting image of perticular user
        Question.findOne({ score: user.curscore }).then((question) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json([
            {
              sucess: true,
              score: question.score,
              question: question.image,
              answer: question.answer,
            },
          ]);
        })
        .catch((err) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json([
            {
              sucess: true,
              msg: "You have made till end",
            },
          ]);
        });
      })
      .catch((err) => {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json([
          {
            sucess: false,
            msg: "No User Exists with Enrollment- " + req.body.enrno,
          },
        ]);
      });
    //end if
  } else {
    console.log("no valid enrno");
  }
};

exports.post_question = (token_enrno, req, res, next) => {
  if (token_enrno != undefined) {
    User.findOne({ enrno: token_enrno })
      .then((user) => {
        //posting question for only admin
        if (user.admin == true) {
          //post ques
          Question.findOne().sort({_id:-1}).then((newscore) => {
            bcrypt.hash(req.body.answer.toUpperCase(), 8, function (
              err,
              hash_answer
            ) {
              const question_obj = {
                score: newscore.score + 1,
                image: req.body.image,
                answer: hash_answer,
              };
              Question.create(question_obj)
                .then((data) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json([
                    {
                      sucess: true,
                      score: data.score,
                      image: data.image,
                      answer: data.answer,
                      updated_by: token_enrno,
                    },
                  ]);
                })
                .catch((err) => next(err));
            });
          });
        } else {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.json([
            {
              sucess: false,
              msg: "The User- " + token_enrno + " is not ADMIN",
            },
          ]);
        }
      })
      .catch((err) => {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json([
          {
            sucess: false,
            msg: "No User Exists with Enrollment- " + req.body.enrno,
          },
        ]);
      });
    //end if
  } else {
    console.log("no valid enrno");
  }
};

exports.question_answer = (token_enrno, req, res, next) => {
  if (token_enrno != undefined) {
    User.findOne({ enrno: token_enrno })
      .then((user) => {
        //posting asnwer and checking answer
        Question.findOne({score: user.curscore}).then((question_data) => {
          bcrypt.compare(req.body.answer.toUpperCase(), question_data.answer, function (err, result) {
            //check for correct answer
            if (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.json({ sucess: false, msg: err });
              return;
            }
            if (result != true) {
              Question.findOne({ score: user.curscore }).then((question) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json([
                  {
                    sucess: true,
                    score: question.score,
                    question: question.image,
                    answer: question.answer,
                  },
                ]);
              })
              .catch((err) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json([
                  {
                    sucess: true,
                    msg: "You have made till end",
                  },
                ]);
              });
            } else {
              Question.findOne({score: user.curscore+1}).then((data) => {
                User.findOneAndUpdate({ enrno: token_enrno },{curscore: user.curscore+1})
                .then(
                  (user_data) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json([
                      {
                        sucess: true,
                        score: data.score,
                        question: data.image,
                        answer: data.answer,
                      },
                    ]);
                  },
                  (err) => console.log("pl")
                )
                .catch((err) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json([
                    {
                      sucess: false,
                      msg: "You have made till end"
                    },
                  ]);
                });
              })
              .catch((err) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json([
                  {
                    sucess: false,
                    msg: "You have made till end"
                  },
                ]);
              });
            }
          })
        })
        .catch((err) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json([
            {
              sucess: false,
              msg: "You have made till end"
            },
          ]);
        });
      })
      .catch((err) => {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json([
          {
            sucess: false,
            msg: "No User Exists with Enrollment- " + req.body.enrno,
          },
        ]);
      });
    //end if
  } else {
    console.log("no valid enrno");
  }
};
