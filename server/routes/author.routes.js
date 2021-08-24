const AuthorController = require('../controllers/author.controller');

module.exports = (app) => {
    app.get('/api', AuthorController.index);
    app.get('/api/authors',AuthorController.getAllAuthors); // List all authors
    app.get('/api/authors/:id',AuthorController.getAuthor); // List one author
    app.post('/api/authors', AuthorController.createAuthor); // Add new author
    app.put('/api/authors/:id',AuthorController.updateAuthor); // Update one author
    app.delete('/api/authors/:id', AuthorController.deleteAuthor); // Delete an author
}