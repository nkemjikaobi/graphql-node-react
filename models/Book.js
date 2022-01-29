const mongoose = require('mongoose');
const BookSchema = mongoose.Schema({
    name: {
        type: String,
    },
    genre: {
        type: String,
    },
    authorId: {
        type: String,
    },
})

const Book = mongoose.model('book',BookSchema);

module.exports = Book;