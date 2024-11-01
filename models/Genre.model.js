const {Schema, model} = require('mongoose')


const genreSchema = new Schema({

    name:String,
    books:[{
        type: Schema.Types.ObjectId,
        ref:'Book'
    }]
})

const Genre = model("Genre",genreSchema)


module.exports = Genre