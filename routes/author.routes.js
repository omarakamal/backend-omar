const router = require('express').Router()

const { isAutheticated } = require('../middleware/jwt.middleware')
const Author = require('../models/Author.model')


router.post('/authors',(req,res)=>{

    Author.create(req.body)
    .then((createdAuthor)=>{res.json(createdAuthor)})
    .catch((err)=>{res.json(err)})
})


router.get('/authors',(req,res)=>{

    Author.find()
    .populate({
        path:"books",
        populate:{
            path:"genre"
        }
    })
    .then((allAuthors)=>{res.json(allAuthors)})
    .catch((err)=>{res.json(err)})
})


// Exercise 2: create a GET route to get 1 author. This route should also show all the books the author has written not just the ids


router.get('/authors/:id',(req,res)=>{

    Author.findById(req.params.id)
    .populate({
        path:"books",
        populate:{
            path:"genre"
        }
    })
  
    .then((foundAuthor)=>{res.json(foundAuthor)})
    .catch((err)=>{res.json(err)})
})






module.exports = router