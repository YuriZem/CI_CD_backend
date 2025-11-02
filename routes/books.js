const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/books.json');

// Função auxiliar para ler dados
function readData() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

// Função auxiliar para salvar dados
function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// 📖 GET - listar todos os livros
router.get('/', (req, res) => {
  const books = readData();
  res.json(books);
});

// 🔍 GET - buscar livro por ID
router.get('/:id', (req, res) => {
  const books = readData();
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
  res.json(book);
});

// ➕ POST - adicionar novo livro
router.post('/', (req, res) => {
  const books = readData();
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    year: req.body.year
  };
  books.push(newBook);
  writeData(books);
  res.status(201).json(newBook);
});

// ✏️ PUT - atualizar um livro
router.put('/:id', (req, res) => {
  const books = readData();
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).json({ message: 'Livro não encontrado' });

  books[bookIndex] = { ...books[bookIndex], ...req.body };
  writeData(books);
  res.json(books[bookIndex]);
});

// ❌ DELETE - remover um livro
router.delete('/:id', (req, res) => {
  const books = readData();
  const updatedBooks = books.filter(b => b.id !== parseInt(req.params.id));
  if (updatedBooks.length === books.length) return res.status(404).json({ message: 'Livro não encontrado' });
  writeData(updatedBooks);
  res.json({ message: 'Livro removido com sucesso' });
});

module.exports = router;