const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Book = require("./models/bookModel");
const bookRouter = require("./Routes/bookRouter")(Book);
const app = express();
const port = process.env.PORT || 3000;
// next connects to test db
// if (process.env.ENV === 'Test') {
//   console.log('This is a test');
//   const db = mongoose.connect('mongodb://localhost/RestAPI_Test');
//  } else {
//   console.log('This is for real!');
  // next line connects to mongodb
const db = mongoose.connect("mongodb://localhost/RestAPI");  //remove -prod when you wan to connect to it
//  }

//add two lines below to get pody-parser to work after importing and adding post route
//second app.use pulls info out of json and gives it to us in our req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//removed res.json(response);
//the next line hooks up the router
app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

//changed app.listen(port, () => {} to app.server = app.listen(port, () => {})
app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

//adding export for testing (done in testing chapter for integration testing)
//allows it to be pulled into the booksintegrationtest.js
module.exports = app;