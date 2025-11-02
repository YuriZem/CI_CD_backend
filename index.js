const express = require('express');
const app = express();
const booksRoutes = require('./routes/books');

app.use(express.json());
app.use('/books', booksRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`📚 Servidor da livraria rodando na porta ${PORT}`));

module.exports = app;