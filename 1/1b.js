const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const dbName = "CIE";

MongoClient.connect("mongodb://127.0.0.1:27017")
.then(client => {
    console.log("Successfully connected to the database");
    const db = client.db(dbName);

    var myLogger = function(req,res,next) {
        console.log("LOGGED");
        next();
    }
    app.use(myLogger);

    app.get("/fillData", function(req,res) {
        res.sendFile(__dirname + "/1b.html");
    })

    app.get("/", function(req,res) {
        const text = `
            <center><h1>Home</h1></center>
            <ul>
                <li><a href="/fillData">Insert data</a></li>
                <li><a href="/displayQuery">Display students: Marks less than 20</a></li>
                <li><a href="/displayAll">Display all</a></li>
            </ul>
        `;

        res.send(text);
    })

    app.get("/insert", function(req,res) {
        const data = {
            Name: req.query.name,
            USN: req.query.usn,
            CIE: parseInt(req.query.cie),
            Code: req.query.code
        }

        db.collection("student").insertOne(data)
        .then(result => {
            res.send("Successfully inserted the data");
        })
        .catch(err => {
            console.log(err);
            res.send("Error inserting the data");
        })
    })

    app.get("/displayQuery", function(req,res) {
        db.collection("student").find({CIE: {$lt: 20}}).toArray()
        .then(result => {
            var table = `<table border="1"><tr><th>Name</th><th>USN</th><th>CIE Marks</th><th>Subject Code</th></tr>`;

            result.forEach(students => {
                table += `<tr><td>${students.Name}</td><td>${students.USN}</td><td>${students.CIE}</td><td>${students.Code}</td></tr>`;
            })

            table += `</table>`;

            res.send(table);
        })
        .catch(err => {
            console.log(err);
            res.send("Error displaying data");
        })
    })

    app.get("/displayAll", function(req,res) {
        db.collection("student").find().toArray()
        .then(result => {
            var table = `<table border="1"><tr><th>Name</th><th>USN</th><th>CIE Marks</th><th>Subject Code</th></tr>`;

            result.forEach(students => {
                table += `<tr><td>${students.Name}</td><td>${students.USN}</td><td>${students.CIE}</td><td>${students.Code}</td></tr>`;
            })

            table += `</table>`;

            res.send(table);
        })
        .catch(err => {
            console.log(err);
            res.send("Error displaying data");
        })
    })


    app.listen(5000, function() {
        console.log("App is listening at http://localhost:5000");
    })
})
.catch(err => {
    console.log("Error connecting to the database: ", err);
})