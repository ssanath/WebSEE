const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const dbName = "Feesdb";

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
        res.sendFile(__dirname + "/3b.html");
    })

    app.get("/", function(req,res) {
        const text = `
            <center><h1>Home</h1></center>
            <ul>
                <li><a href="/fillData">Insert data</a></li>
                <li><a href="/delete">Delete students</a></li>
                <li><a href="/displayAll">Display all</a></li>
            </ul>
        `;

        res.send(text);
    })

    app.get("/insert", function(req,res) {
        const data = {
            Name: req.query.name,
            USN: req.query.usn,
            Semester: req.query.sem,
            Fee: parseInt(req.query.fees)
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

    app.get("/delete", function(req,res) {
        db.collection("student").deleteMany({Fee: 0})
        .then(result => {
            res.send("Student(s) who have not paid the exam fees have been deleted");
        })
        .catch(err => {
            console.log(err);
            res.send("Error deleting student(s)");
        })
        
    })

    app.get("/displayAll", function(req,res) {
        db.collection("student").find().toArray()
        .then(result => {
            var table = `<table border="1"><tr><th>Name</th><th>USN</th><th>Semester</th><th>Exam Fees</th></tr>`;

            result.forEach(student => {
                table += `<tr><td>${student.Name}</td><td>${student.USN}</td><td>${student.Semester}</td><td>${student.Fee}</td></tr>`;
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