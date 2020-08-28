const express = require("express");
const bodyParser = require("body-parser");

//jwt token
const auth = require("../auth_jwt");
const login = require("../controllers/login");
const signup = require("../controllers/signup");
const question = require("../controllers/question");
const leaderboard = require("../controllers/leaderboard");
const hint = require("../controllers/hint");

//router setup
const apiRouter = express.Router();
apiRouter.use(bodyParser.json());

//impoting function

//const promA = new Promise((req,res,next) =>auth.getToken(req,res,next))
//const promB = promA.then(login.login)
//using router

//for login
apiRouter.post("/login", function (req, res, next) {
  auth
    .getToken(req)
    .then((token) => login.login(token, req, res, next))
    .catch((token) => login.login(token, req, res, next));
});

//for signup
apiRouter.post("/signup", function (req, res, next) {
  auth
    .getToken(req)
    .then((token) => signup.signup(token, req, res, next))
    .catch((token) => signup.signup(token, req, res, next));
});

//to check specfic enrollment number is on what question
apiRouter.get("/question", (req, res, next) => {
  const token_enrno = auth.verifyToken(req, res, next);
  question.question(token_enrno, req, res, next)
});

//to post new question only by admin
apiRouter.post("/question_post", (req, res, next) => {
  const token_enrno = auth.verifyToken(req, res, next);
  question.post_question(token_enrno, req, res, next)
});

//to check the answer of perticular question
apiRouter.post("/question_answer",(req, res, next) => {
  const token_enrno = auth.verifyToken(req, res, next);
  question.question_answer(token_enrno, req, res, next)
})

//to get the list of leader board
apiRouter.get("/leaderboard",(req, res, next) => {
  const token_enrno = auth.verifyToken(req, res, next);
  leaderboard.get_list(token_enrno, req, res, next)
})

//to get the list of hint posted
apiRouter.get("/hint",(req, res, next) => {
  const token_enrno = auth.verifyToken(req, res, next);
  hint.get_list(token_enrno, req, res, next)
})

//to post new hint only by admin
apiRouter.post("/hint_post",(req, res, next) => {
  const token_enrno = auth.verifyToken(req, res, next);
  hint.post_hint(token_enrno, req, res, next)
})

module.exports = apiRouter;
