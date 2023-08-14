/* eslint-disable no-param-reassign */
const express = require("express");
const booksController = require('../controllers/booksController');  //includes the function in this file

function routes(Book) {
  const bookRouter = express.Router();
  //added this in for controller - executes an passes book controller
  // const controller = booksController(Book);
  //find books
  bookRouter
    .route("/books")
    // .get(controller.get)
    // .post(controller.post);
  
    //inserts a book
    //moved below to controller
    .post(async (req, res) => {
      try {
        const book = new Book(req.body);
        const savedBook = await book.save(); //saves new book to db
        //console.log(savedBook);
        return res.status(201).json(savedBook);
      } catch (err) {
        return res.send(err);
      }
    })

    // const response = { hello: 'This is my API' };  ***removed this initial code to test router
    //get all books
    //moved beow to controller
    .get(async (req, res) => {
      try {
        const { query } = req;
        const books = await Book.find(query, {});
        return res.json(books);
      } catch (err) {
        return res.send(err);
      }
    });

  //find by ID
  bookRouter.route("/books/:bookId").get(async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId);
      if (!book) {
        return res.status(404).send("Book not found");
      }
      return res.json(book);
    } catch (err) {
      return res.send(err);
    }
  });

  //updates a book by ID
  bookRouter
    .route("/books/:bookId")
    //adding below get (request.response) in for last chapter - lines 58 to 65
    .get((req, res) => {
      const returnBook = req.book.toJSON();

      returnBook.links = {};
      const genre = req.book.genre.replace(' ', '%20');
      returnBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${req.book.genre}`;
      res.json(returnBook)
    })
    .put(async (req, res) => {
      try {
        // const { query } = req;
        const book = await Book.findById(req.params.bookId);
        if (!book) {
          return res.status(404).send("Book not found");
        }
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.genre = req.body.genre || book.genre;
        book.read = req.body.read || book.read;
        const updatedBook = await book.save();
        return res.json(updatedBook);
      } catch (err) {
        return res.send(err);
      }
    })
    // add patch here
    .patch(async (req, res) => {
      try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
          return res.status(404).send("Book not found");
        }
        if (req.body.title) {
          book.title = req.body.title;
        }
        if (req.body.author) {
          book.author = req.body.author;
        }
        if (req.body.genre) {
          book.genre = req.body.genre;
        }
        if (req.body.read) {
          book.read = req.body.read;
        }
        const updatedBook = await book.save();
        return res.json(updatedBook);
      } catch (err) {
        return res.send(err);
      }
    })
    // delete a book
    .delete(async (req, res) => {
      try {
        const deletedBook = await Book.findByIdAndRemove(req.params.bookId);
        if (!deletedBook) {
          return res.status(404).send("Book not found");
        }
        return res.json(deletedBook);
      } catch (err) {
        return res.send(err);
      }
    });

  return bookRouter;
}

module.exports = routes;
