const router = require('express').Router()
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isAutheticated } = require('../middleware/jwt.middleware')


// POST /signup route

router.post('/signup', (req, res) => {

    console.log(req.body)

    const {name,email,password} = req.body

    // VALIDATION: no fields are empty
    if(name==="",email==="",password===''){
        res.status(400).json({errorMessage:"Please provide all the mandatory fields"})
        return
    }

    // VALIDATION: Email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if(!emailRegex.test(email)){
        res.status(400).json({errorMessage:"Please provide a valid email"})
        return
    }

    // VALIDATION: password strength
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!passwordRegex.test(password)){
        res.status(400).json({errorMessage:"Password should be at least 6 characters, one uppercase, one lowercase, and one number"})
        return
    }

    // VALIDATION: if the email is already used

    User.findOne({email})
    .then((foundUser)=>{

        if(foundUser){
            res.status(400).json({errorMessage:"Email already signed up"})
            return
        }
    })


    const salt = bcrypt.genSaltSync(10)
    // hashSync is the method that encrypts our password
    const encryptedPassword = bcrypt.hashSync(password, salt)

    console.log(encryptedPassword)


    User.create({ name, email, password: encryptedPassword })
        .then((createdUser) => {
            res.status(201).json(createdUser)
        })
        .catch((err) => {
            if (err.code === 11000) {
                res.status(400).json({ errorMessage: "email should be unique please sign up with unique email" })
                return
            }
            res.status(400).json(err)
        })
    // User.create(req.body)
    // .then((createdUser)=>{
    //     res.status(201).json(createdUser)


    // })
    // .catch((err)=>{
    //     if(err.code===11000){
    //         res.status(400).json({errorMessage:"email should be unique please sign up with unique email"})
    //         return
    //     }
    //     res.status(400).json(err)
    // })

})



// POST /login route

router.post('/login',(req,res)=>{

    const {email, password} = req.body

    // VALIDATE

    if(email===""|| password==""){
        res.status(400).json({errorMessage:"Please fill in all the required fields"})
        return
    }

    // CHECK IF THE PASSWORD IS CORRECT

    User.findOne({email:email})
    .then((foundUser)=>{

        if(!foundUser){
            res.status(400).json({errorMessage:"Please signup, no account with this email listed"})
            return
        }
 

        const passwordCheck = bcrypt.compareSync(password,foundUser.password)

        console.log(passwordCheck)

        if(passwordCheck){

        // CREATE THE TOKEN

            const {email,name,_id} = foundUser

            const payload = {email,name,_id}

            // method that returns the JWT token
            const authToken = jwt.sign(payload,process.env.TOKEN_SECRET,{algorithm:"HS256",expiresIn:"1h"})

            console.log(authToken)

                //SEND BACK THE TOKEN

            res.json({authToken:authToken})

        }
        else{
            res.status(400).json({errorMessage:"Password or Email is Incorrect"})
            return
        }

    })
    .catch((err)=>{
        res.json(err)
    })


})



router.get('/verify',isAutheticated,(req,res)=>{

    res.json(req.payload)
})








module.exports = router




// VALIDATE

// CHECK IF THEY PROVIDED THE RIGHT PASSWORD

// GENERATE TOKEN

// SEND BACK THE TOKEN AS RESPONSE