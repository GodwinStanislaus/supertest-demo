const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

describe("Retrieve Book API testcases", () => {
  const initialSetOfBooks = [
    { id: 1, name: "Java", author: "Gosling" },
    { id: 2, name: "Python", author: "Van Rossum" },
    { id: 3, name: "Head First Javascript", author: "Brendan" },
  ];

  beforeEach(() => {
    // console.log(" Set up data thats needed before running each testcase ");
  });

  it("sholud retrieve list of books ", async () => {
    await request
      .get("/api/books")
      .expect("Content-Type", "application/json; charset=utf-8")
      // .expect("Content-Length", "152")
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(3);
        expect(response.body).toStrictEqual(initialSetOfBooks);
      });
  });

  it("should retrieve a single book", async () => {
    const bookId = 2;
    await request
      .get(`/api/books/${bookId}`)
      .expect(200)
      .expect(initialSetOfBooks[1]);
  });

  it("should retrieve a single book - 2 ", (done) => {
    const bookId = 2;
    const pythonBook = initialSetOfBooks[1];
    request
      .get(`/api/books/${bookId}`)
      .expect(200)
      .expect(pythonBook)
      .expect((res) => {
        const result = res.body;
        expect(result.author).toBe(pythonBook.author);
        expect(result.name).toBe(pythonBook.name);
      })
      .end((err, res) => {
        if (err) throw done(err);
        return done();
      });
  });
});

describe(" Update Book API testcase ", () => {
  const bookToUpdate = {
    id: 1,
    name: "Core Java",
    author: "James Gosling",
  };

  // Update Book //
  it("should update book with id 1", async () => {
    await request.put("/api/books").send(bookToUpdate).expect(200);
  });

  it("should not update a book when an invalid book id is passed", async () => {
    // set up test data - book id 5 is not available //
    const book = { ...bookToUpdate, id: 5 };
    // execute and verify
    await request.put("/api/books").send(book).expect(202).expect({
      message: "Book does not exist!",
      bookToBeUpdated: book,
    });
  });
});

describe(" Create Books API testcases", () => {
  const newBook = { name: "The Hobbit", author: "JRR Tolkien" };
  it("should create a new book successfully", (done) => {
    request
      .post("/api/books")
      .send(newBook)
      .expect(201)
      .end((err, res) => {
        if (err) throw done(err);
        return done();
      });
  });
});
