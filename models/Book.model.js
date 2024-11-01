const mongoose = require('mongoose')

// Schema

const bookSchema = new mongoose.Schema({

    title:{
        type:String
    },
    author:{
        // author field is now a type of ObjectId
        type: mongoose.Schema.Types.ObjectId,
        ref:"Author"
    },
    pageNumbers:{
        type: Number
    },
    genre:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Genre"
    }
})


// model

const Book = mongoose.model('Book',bookSchema)


module.exports = Book