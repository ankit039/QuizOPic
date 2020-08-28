require("dotenv").config();

//models for db
const User = require("../models/usermodel");
const Hint = require("../models/hintmodel");

exports.get_list = (token_enrno, req, res, next) => {
  if (token_enrno != undefined) {
    Hint.aggregate([
        {
          $project: {
            question: 1,
            hint: 1,
            _id: 1,
            createdAt: 1,
            sucess: { $concat: ["true"] },
          },
        },
      ])
      .then((hint) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(hint);
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

exports.post_hint = (token_enrno, req, res, next) => {
    if (token_enrno != undefined) {
      User.findOne({ enrno: token_enrno })
        .then((user) => {
          //posting question for only admin
          if (user.admin == true) {
            //post hint
            const hint_obj = {
                question: req.body.question,
                hint: req.body.hint
              };
            Hint.create(hint_obj)
            .then((data) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json([
                  {
                    sucess: true,
                    question: data.question,
                    hint: data.hint
                  },
                ]);
            })
            .catch((err) => next(err));
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
