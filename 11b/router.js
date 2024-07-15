const express = require("express");
const app = express();

var myLogger = function(req,res,next) {
    console.log("LOGGED");
    next();
}
app.use(myLogger);

app.get("/", function(req,res) {
    const text = `
        <center><h1>HOME</h1></center>
        <p>Welcome to my page!!</p>
        <ul>
            <li><a href="/cse">CSE</a></li>
            <li><a href="/me">Mech</a></li>
            <li><a href="/ece">ECE</a></li>
        </ul>
    `;

    res.send(text);
})

app.get("/cse", function(req,res) {
    res.sendFile(__dirname + "/cse.html");
})

app.get("/me", function(req,res) {
    res.sendFile(__dirname + "/mech.html");
})

app.get("/ece", function(req,res) {
    res.sendFile(__dirname + "/ece.html");
})

app.listen(5000, function() {
    console.log("App is listening at http://localhost:5000");
})