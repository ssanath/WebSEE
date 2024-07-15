const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const dbName = "studentgradedb";

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
        res.sendFile(__dirname + "/9b.html");
    })

    app.get("/updateData", function(req,res) {
        res.sendFile(__dirname + "/update.html");
    })

    app.get("/", function(req,res) {
        const text = `
            <center><h1>Home</h1></center>
            <ul>
                <li><a href="/fillData">Insert data</a></li>
                <li><a href="/updateData">Update data</a></li>
                <li><a href="/displayAll">Display all</a></li>
            </ul>
        `;

        res.send(text);
    })

    app.get("/insert", function(req,res) {
        const data = {
            Name: req.query.name,
            USN: req.query.usn,
            Department: req.query.dept,
            Grade: req.query.grade
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

    app.get("/update", function(req,res) {
        const query = {
            Name: req.query.name
        };
        const newValues = {};

        if(req.query.grade) {
            newValues.Grade = req.query.grade
        }
        if(Object.keys(newValues).length == 0) {
            res.send("No update parameters have been set");
        }
        const updateValues = {$set: newValues}
        db.collection("student").updateMany(query,updateValues)
        .then(students => {
            res.send("Student(s) successfully updated");
        })
        .catch(err => {
            console.log(err);
        })
    })

    app.get("/displayAll", function(req,res) {
        db.collection("student").find().toArray()
        .then(students => {
            var table = `<table border = "1"><tr><th>Name</th><th>USN</th><th>Department</th><th>Grade</th></tr>`;
            students.forEach(student => {
                table += `<tr><td>${student.Name}</td><td>${student.USN}</td><td>${student.Department}</td><td>${student.Grade}</td></tr>`;
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