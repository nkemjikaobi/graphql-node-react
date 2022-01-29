const mongoose = require('mongoose');
const AuthorSchema = mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
})

const Author = mongoose.model('author',AuthorSchema);

module.exports = Author;