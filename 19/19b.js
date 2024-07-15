const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const dbName = "attendance";

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
        res.sendFile(__dirname + "/19b.html");
    })

    app.get("/", function(req,res) {
        const text = `
            <center><h1>HOME</h1></center>

            <ul>
                <li><a href="/fillData">Insert data</a></li>
                <li><a href="/displayQuery">Display students: attendance less than 75</a></li>
                <li><a href="/displayAll">Display all students</a></li>
            </ul>
        `;

        res.send(text);
    })

    app.get("/insert", function(req,res) {
        const data = {
            Name: req.query.name,
            USN: req.query.usn,
            Attendance: parseInt(req.query.attendance)
        };

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
        db.collection("student").find({Attendance: {$lt: 75}}).toArray()
        .then(students => {
            var table = `<table border="1"><tr><th>Name</th><th>USN</th><th>Attendance</th></tr>`;

            students.forEach(student => {
                table += `<tr><td>${student.Name}</td><td>${student.USN}</td><td>${student.Attendance}</td></tr>`;
            })
            table += `</table>`;
            res.send(table);
        })
        .catch(err => {
            console.log(err);
            res.send("Error displaying the data");
        })
    })

    app.get("/displayAll", function(req,res) {
        db.collection("student").find().toArray()
        .then(students => {
            var table = `<table border="1"><tr><th>Name</th><th>USN</th><th>Attendance</th></tr>`;

            students.forEach(student => {
                table += `<tr><td>${student.Name}</td><td>${student.USN}</td><td>${student.Attendance}</td></tr>`;
            })
            table += `</table>`;
            res.send(table);
        })
        .catch(err => {
            console.log(err);
            res.send("Error displaying the data");
        })
    })

    app.listen(5000, function() {
        console.log("App is successfully listening at http://localhost:5000");
    })
})
.catch(err => {
    console.log("Error connectinf to the databse: ", err);
})