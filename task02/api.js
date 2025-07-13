const express = require('express');
const app = express();

app.use(express.json());  // To parse JSON data

let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
  { id: 2, title: "Lord of the Rings", author: "J.R.R. Tolkien" }
];

// READ all books
app.get('/books', (req, res) => {
  res.json(books);
});

// CREATE a new book
app.post('/books', (req, res) => {
  const book = req.body;
  books.push(book);
  res.status(201).send('Book added');
});

// UPDATE a book
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index !== -1) {
    books[index] = req.body;
    res.send('Book updated');
  } else {
    res.status(404).send('Book not found');
  }
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.send('Book deleted');
});

app.listen(3000, () => console.log('API running on port 3000'));