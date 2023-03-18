
//import express and router variable of that express
//router is like app that lives inside main application
//now we will create routes

const express = require('express')
const router = express.Router()
const Book = require('../models/book')

router.get('/', async (req, res) => {
  let books
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch {
    books = []
  }
  res.render('index', { books: books })
})

module.exports = router
//res.send ki jagah res.render kaer diye ek file ko
//render aise hoga ===>(views folder -> layouts folder -> layout file(when finds body)->index.js->remaining layout)


 
// router.get('/books',(req,res)=>{
//     res.send('books');
// });




module.exports = router
//always remember to export this router so that our main file can get access to it
//always look at what are the errors and act accordingly 

