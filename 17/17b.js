const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const dbName = "FacultyDB";

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
        res.sendFile(__dirname + "/17b.html");
    })

    app.get("/", function(req,res) {
        const text = `
            <center><h1>Home</h1></center>
            <ul>
                <li><a href="/fillData">Insert data</a></li>
                <li><a href="/displayQuery">Display faculty: CSE and Proffessor</a></li>
                <li><a href="/displayAll">Display all</a></li>
            </ul>
        `;

        res.send(text);
    })

    app.get("/insert", function(req,res) {
        const data = {
            Name: req.query.name,
            ID: req.query.id,
            Title: req.query.title,
            Branch: req.query.branch
        }

        db.collection("faculty").insertOne(data)
        .then(result => {
            res.send("Successfully inserted the data");
        })
        .catch(err => {
            console.log(err);
            res.send("Error inserting the data");
        })
    })

    app.get("/displayQuery", function(req,res) {
        db.collection("faculty").find({Branch: "CSE", Title: "Proffessor"}).toArray()
        .then(result => {
            var table = `<table border="1"><tr><th>Name</th><th>ID</th><th>Title</th><th>Branch</th></tr>`;

            result.forEach(faculty => {
                table += `<tr><td>${faculty.Name}</td><td>${faculty.ID}</td><td>${faculty.Title}</td><td>${faculty.Branch}</td></tr>`;
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
        db.collection("faculty").find().toArray()
        .then(result => {
            var table = `<table border="1"><tr><th>Name</th><th>ID</th><th>Title</th><th>Branch</th></tr>`;

            result.forEach(faculty => {
                table += `<tr><td>${faculty.Name}</td><td>${faculty.ID}</td><td>${faculty.Title}</td><td>${faculty.Branch}</td></tr>`;
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