const express = require("express");
const app = express();
var count = 0;
var myLogger = function(req,res,next) {
    console.log("LOGGED");
    next();
}
app.use(myLogger);

var login = function(req,res,next) {
    count++;
    next();
}
app.use(login);

app.get("/", function(req,res) {
    res.send(`You have logged in ${count} time(s)`);
})

app.listen(5000, function() {
    console.log("App is listening at http://localhost:5000");
})