const express = require("express");
const app = express();

var myLogger = function(req,res,next) {
    console.log("LOGGED");
    next();
}
app.use(myLogger);

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/home.html");
})

app.get("/register", function(req,res) {
    res.sendFile(__dirname + "/registration.html");
})

app.get("/announcements", function(req,res) {
    res.sendFile(__dirname + "/announcement.html");
})

app.listen(5000, function() {
    console.log("App is listening at http://localhost:5000");
})