const Genre = require('../models/Genre.model')

const router = require('express').Router()




router.get('/genres',(req,res)=>{

    Genre.find()
    .then((allGenres)=>{res.json(allGenres)})
    .catch((err)=>{res.json(err)})
})


router.post('/genres',(req,res)=>{

    Genre.create(req.body)
    .then((createdGenre)=>{res.json(createdGenre)})
    .catch((err)=>{res.json(err)})
})








module.exports = router