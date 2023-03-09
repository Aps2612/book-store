const express = require('express');
const Author = require('../models/author');
const router = express.Router();
//this is author controller
//it means he will send and retrieve data from model and 
//if data get successful then it will go to success view presentation else it will show error view presentation
//import express and router variable of that express
//we have to make different routes of author
//second line gives us access to author model by importing

//1.all author route
router.get('/',(req,res)=>{
    //i will try to fetch the data of all authors from database
    //db.users.find({ })
    res.render('authors/index');
});


//2.new author route
router.get('/new',(req,res)=>{
    //I will take input and try to insert data into database
    //db.users.insert({author : req.body.name})
    res.render('authors/new',{ author : new Author() })
});
//new Author create new author

//3.create author route
router.post('/',(req,res)=>{
    res.send(req.body.name);
});
//kewal iske liye pehle body-parser npm install karna pada
//aur phir import kiya
//app.use(bodyParser.urlencoded({ limit : '10mb',extended : false }))

module.exports = router;


//**route or controllers will have a single file and in the views we have all the files for a single route controller

















module.exports = router
//always remember to export this router so that our main file can get access to it
//always look at what are the errors and act accordingly 

