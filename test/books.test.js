const request = require('supertest');
const app = require('../index');

describe('API Livraria', () => {
  it('Deve listar todos os livros', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deve buscar um livro por ID', async () => {
    const res = await request(app).get('/books/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBeDefined();
  });

  it('Deve retornar 404 para ID inexistente', async () => {
    const res = await request(app).get('/books/999');
    expect(res.statusCode).toBe(404);
  });
});