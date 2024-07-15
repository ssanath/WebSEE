const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const dbName = "studentdb";

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
        res.sendFile(__dirname + "/16b.html");
    })

    app.get("/", function(req,res) {
        const text = `
            <center><h1>Home</h1></center>
            <ul>
                <li><a href="/fillData">Insert data</a></li>
                <li><a href="/displayQuery">Display CSE 6th semester students</a></li>
                <li><a href="/displayAll">Display all</a></li>
            </ul>
        `;

        res.send(text);
    })

    app.get("/insert", function(req,res) {
        const data = {
            Name: req.query.name,
            Branch: req.query.branch,
            Semester: req.query.sem
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
        db.collection("student").find({Branch:"CSE", Semester:"6"}).toArray()
        .then(students => {
            var table = `<table border = "1"><tr><th>Name</th><th>Branch</th><th>Semester</th></tr>`;
            students.forEach(student => {
                table += `<tr><td>${student.Name}</td><td>${student.Branch}</td><td>${student.Semester}</td></tr>`;
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
        .then(students => {
            var table = `<table border = "1"><tr><th>Name</th><th>Branch</th><th>Semester</th></tr>`;
            students.forEach(student => {
                table += `<tr><td>${student.Name}</td><td>${student.Branch}</td><td>${student.Semester}</td></tr>`;
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