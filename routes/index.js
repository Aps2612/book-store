const express = require('express');
const router = express.Router();
//import express and router variable of that express
//router is like app that lives inside main application
//now we will create routes

router.get('/',(req,res)=>{
    res.render('index');
});
//res.send ki jagah res.render kaer diye ek file ko
//render aise hoga ===>(views folder -> layouts folder -> layout file(when finds body)->index.js->remaining layout)


 
// router.get('/books',(req,res)=>{
//     res.send('books');
// });




module.exports = router
//always remember to export this router so that our main file can get access to it
//always look at what are the errors and act accordingly 

