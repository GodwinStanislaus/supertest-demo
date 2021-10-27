const express = require("express");
const router = express.Router();

let books = [];

books.push(
  { id: 1, name: "Java", author: "Gosling" },
  { id: 2, name: "Python", author: "Van Rossum" },
  { id: 3, name: "Head First Javascript", author: "Brendan" }
);

/**
 * find all books
 */
router.get("/books", (req, res) => {
  return res.status(200).send(books);
});

/**
 * find book by id
 */
router.get("/books/:id", (req, res) => {
  const book = books.find((book) => book.id == req.params.id);
  return res.status(200).send(book);
});

/**
 * create a new book
 */
router.post("/books", (request, response) => {
  const id = books.length + 1;
  const book = request.body;
  books.push({ id, ...book });
  response.status(201).send({ message: `New Book is created with id ${id}` });
});

/**
 * update an existing book
 */
router.put("/books", (req, res) => {
  const bookToEdit = req.body;
  const bookExists = books.find((book) => book.id == bookToEdit.id);
  if (bookExists) {
    books = books.map((book) =>
      book.id !== bookToEdit.id ? book : bookToEdit
    );
    res.status(200).send(bookToEdit);
  } else {
    res
      .status(202)
      .send({ message: "Book does not exist!", bookToBeUpdated: bookToEdit });
  }
});

/**
 * delete a book
 */
router.delete("/books/:id", (req, res) => {
  const bookDelete = books.find((book) => book.id == req.params.id);
  if (bookDelete) {
    books = book.filter((book) => book.id != bookDelete.id);
    // 204 - No Content - for testing purpose sending a message //
    res
      .status(204)
      .status({ message: `Book with id ${req.params.id} deleted` });
  } else {
    res
      .status(202)
      .send({ message: `Book does not exist with id ${req.params.id}` });
  }
});

module.exports = router
