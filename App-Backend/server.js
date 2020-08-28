const express = require("express");
const app = express();
var path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config()

const log = console.log;

const port = process.env.PORT || 3000;

const apiRouter = require("./api/api");
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));


//mongo connection
const url = process.env.DB_LINK;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(
  (dbx) => {
    log("DB -> Connected");
  },
  (err) => {
    log("DB Error -> "+err);
  }
);

/*app.get("/",function(req,res){
  res.sendFile(path.join(__dirname+'/readme.html'));
 });*/
app.use("/api", apiRouter);

// var checkToken = authenticate.verifyToken(token)
// console.log(checkToken)

app.listen(port, () =>
  log(`Example app listening at http://localhost:${port}`)
);
