require("dotenv").config();

//models for db
const User = require("../models/usermodel");

exports.get_list = (token_enrno, req, res, next) => {
  if (token_enrno != undefined) {
    User.aggregate([
      {
        $project: {
          name: 1,
          curscore: 1,
          _id: 1,
          sucess: { $concat: ["true"] },
        },
      },
    ])
      .sort({ curscore: -1 })
      .then((user) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(user);
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
