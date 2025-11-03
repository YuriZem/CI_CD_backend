const express = require('express');
const app = express();
const booksRoutes = require('./routes/books');

app.use(express.json());
app.use('/books', booksRoutes);

// Só inicia o servidor se o arquivo for executado diretamente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`📚 Servidor rodando na porta ${PORT}`));
}

module.exports = app;