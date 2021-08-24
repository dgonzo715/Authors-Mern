const { Mongoose } = require('mongoose');
const { Author } = require('../models/author.model');

// Test case below
module.exports.index = (request, response) => {
    response.json({
       message: "Hello World"
    });
}

module.exports.createAuthor = (request, response) => {
    const { name } = request.body;
    Author.create({
        name
    })
        .then(author => response.json(author))
        .catch(err => response.status(400).json(err)); // Added to include validations
}

module.exports.getAllAuthors = (request, response) => {
    // Author.find({})
    //     .then(authors => response.json(authors))
    //     .catch(err => response.json(err));

    // Get all authors, sorted by name in alphabetical order
    Author.find({}).sort({name: 'asc'})
        .then(authors => response.json(authors))
        .catch(err => response.json(err));
}

module.exports.getAuthor = (request, response) => {
    Author.findOne({_id:request.params.id})
        .then(author => response.json(author))
        .catch(err => response.status(404).json(err));
}

module.exports.updateAuthor = (request, response) => {
    // Need runValidators: true to validate updated item, otherwise it won't check
    Author.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedAuthor => response.json(updatedAuthor))
        .catch(err => {
            response.status(400).json(err)
        }); // Added to include validations
}

module.exports.deleteAuthor = (request, response) => {
    Author.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err));
}
// module.exports = {index, createAuthor}; // Okay if you define the functions above as const