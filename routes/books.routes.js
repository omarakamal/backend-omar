const router = require('express').Router()

const Author = require('../models/Author.model')
const Book = require('../models/Book.model')
const Genre = require('../models/Genre.model')

const {isAutheticated} = require('../middleware/jwt.middleware')



// CRUD

router.get('/books',isAutheticated,(req,res)=>{

    Book.find()
    .populate('author genre')
    .then((allBooks)=>{
        res.json(allBooks)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
})


router.get('/books/:id',(req,res)=>{

    Book.findById(req.params.id)
    .populate('author genre')
    .then((foundBook)=>{
        if(!foundBook){
            res.status(404).json({message:"No Book with associated Id"})
            return
        }
        res.json(foundBook)
    })
    .catch((err)=>{res.json(err)})
})


// Exercise 1:
//      1. Write the POST endpoint for creating a new book


router.post('/books',async(req,res)=>{

    // create the book

    const createdBook = await Book.create(req.body)

    console.log(createdBook._id)

    // add the book id to the author
    const updatedAuthor = await Author.findByIdAndUpdate(req.body.author,{$push:{books:createdBook._id}})

    await Genre.findByIdAndUpdate(req.body.genre,{$push:{books:createdBook._id}})

    res.redirect(`/books/${createdBook._id}`)
})


router.post('/books',(req,res)=>{


    Book.create(req.body)
    .then((createdBook)=>{


        res.redirect(`/books/${createdBook._id}`)
        // res.json(createdBook)
    })
    .catch((err)=>{
        res.json(err)
    })
})





// Update

router.put('/books/:id',(req,res)=>{

    Book.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then((updatedBook)=>{
        res.json(updatedBook)
    })
    .catch((err)=>{
        res.json(err)
    })
})


router.delete('/books/:id',async (req,res)=>{

    try{
        const deletedBook = await Book.findByIdAndDelete(req.params.id)
        res.json(deletedBook)
    }
    catch(err){
        res.json(err)
    }

})


router.get('/books/genre/:genre',(req,res)=>{

    Book.find({genre:req.params.genre})
    .then((foundBooks)=>{
        res.json(foundBooks)
    })
    .catch((err)=>{
        res.json(err)
    })
})





module.exports = router