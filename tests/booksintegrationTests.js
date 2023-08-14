require("should");

const request = require("supertest");
const mongoose = require("mongoose");

process.env.ENV = "Test"; //creates test environment

//supertest needs app.js to run tests below
const app = require("../app.js"); //pulls in app.js

const Book = mongoose.model("Book"); //pulls in Book via mongoose
const agent = request.agent(app); //something for supertest to make it run

describe("Book Crud Test", () => {
  it("should allow a book to be posted and return read and _it", (done) => {
    const bookPost = { title: "My Book", author: "Jon", genre: "Fiction" };

    agent
      .post("/api/books")
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        // console.log(results);    // uncomment this to see entire log of test results for trobleshooting
        //results.body.read.should.not.equal(false);   --> this makes test fail on purpose
        results.body.should.have.property("_id");
        done();
      });
  });

  // afterEach((done) => {
  //   Book.deleteMany({}).exec();
  //   done();
  // });

  // this closes mongoose connection and express
  // after((done) => {
  //   mongoose.connection.close();
  //   app.server.close(done());
  //   });
  // this closes mongoose connection and express
  // after((done) => {
  //   mongoose.connection.close(() => {
  //     app.server.close(done);
  //   });
  // });
});
