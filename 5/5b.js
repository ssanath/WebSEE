const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const dbName = "HR";

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
        res.sendFile(__dirname + "/5b.html");
    })

    app.get("/", function(req,res) {
        const text = `
            <center><h1>Home</h1></center>
            <ul>
                <li><a href="/fillData">Insert data</a></li>
                <li><a href="/displayQuery">Display employees: Salary greater than 50000</a></li>
                <li><a href="/displayAll">Display all</a></li>
            </ul>
        `;

        res.send(text);
    })

    app.get("/insert", function(req,res) {
        const data = {
            Name: req.query.name,
            Email: req.query.email,
            Phone: req.query.phone,
            HireDate: req.query.date,
            JobTitle: req.query.title,
            Salary: parseInt(req.query.salary)
        }

        db.collection("employee").insertOne(data)
        .then(result => {
            res.send("Successfully inserted the data");
        })
        .catch(err => {
            console.log(err);
            res.send("Error inserting the data");
        })
    })

    app.get("/displayQuery", function(req,res) {
        db.collection("employee").find({Salary: {$gt: 50000}}).toArray()
        .then(result => {
            var table = `<table border="1"><tr><th>Name</th><th>Email</th><th>Phone</th><th>Hire Date</th><th>Job Title</th><th>Salary</th></tr>`;

            result.forEach(employee => {
                table += `<tr><td>${employee.Name}</td><td>${employee.Email}</td><td>${employee.Phone}</td><td>${employee.HireDate}</td><td>${employee.JobTitle}</td><td>${employee.Salary}</td></tr>`;
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
        db.collection("employee").find().toArray()
        .then(result => {
            var table = `<table border="1"><tr><th>Name</th><th>Email</th><th>Phone</th><th>Hire Date</th><th>Job Title</th><th>Salary</th></tr>`;

            result.forEach(employee => {
                table += `<tr><td>${employee.Name}</td><td>${employee.Email}</td><td>${employee.Phone}</td><td>${employee.HireDate}</td><td>${employee.JobTitle}</td><td>${employee.Salary}</td></tr>`;
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