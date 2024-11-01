
const mongoose = require('mongoose')



const authorSchema = new mongoose.Schema({

    name:String,
    country:String,
    isBestSeller:Boolean,
    books:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Book"
    }],

})


const Author = mongoose.model('Author',authorSchema)


module.exports = Author