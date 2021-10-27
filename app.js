const express = require("express");
const bookRoutes = require('./book.routes')

const app = new express();
app.use(express.json());
app.use('/api', bookRoutes)
app.get("/", (req, res) => {
  return res
    .status(200)
    .send(`<h1>Welcome to Supertest!</h1> <br> Time: ${new Date()}`);
});

module.exports = app
