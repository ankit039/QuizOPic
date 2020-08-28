var jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getToken = (req) =>
  new Promise((resolve, reject) => {
    const body_enrno = req.body.enrno;
    console.log(body_enrno+" <-login/signup");
    if (body_enrno) {
      resolve(
        jwt.sign({ enrno: body_enrno }, process.env.secretKey, {
          expiresIn: "1h",
        })
      );
    } else {
      reject(false);
    }
  });

exports.verifyToken = (req, res, next) => {
  const fun1 = () => {
  const parse_auth_header = req.header("authorization");
  if (parse_auth_header) {
    const parse_token = parse_auth_header.split(" ")[1];
    const fun2 = jwt.verify(parse_token, process.env.secretKey, function (err, decoded) {
      if (err) {
        res.statusCode = 505;
        res.setHeader("Content-Type", "application/json");
        res.json([{ sucess: false, msg: err.name }]);
      } else {
        return(decoded.enrno);
      }
    });
    return(fun2)
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.json([{ sucess: false, msg: "TokenUndefined" }]);
  }
}
const last= fun1();
return last;
};

exports.refreshToken = function (req, res, next) {
  const parse_auth_header = req.header("authorization");
  if (parse_auth_header) {
    const parse_token = parse_auth_header.split(" ")[1];
    //return jwt.sign(req, process.env.secretKey, { expiresIn: "1h" });
    jwt.verify(parse_token, process.env.secretKey, function (err, decoded) {
      if (err.name == "TokenExpiredError") {
        req.refresh_token = jwt.sign(decoded.enrno, process.env.secretKey, {
          expiresIn: "1h",
        });
        next();
      } else {
        res.statusCode = 505;
        res.setHeader("Content-Type", "application/json");
        res.json([{ sucess: false, msg: err.name }]);
      }
    });
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.json([{ sucess: false, msg: "TokenUndefined" }]);
  }
};
