const router = require("express").Router();


router.get('/index',(req,res)=>{
  res.json("index first route")
})

module.exports = router;
