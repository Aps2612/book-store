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
router.get('/', async (req,res)=>{
    //i will try to fetch the data of all authors from database
    //db.users.find({ })
    let searchOptions = { };
    if(req.query.name != null && req.query.name !== " ")
      searchOptions.name =  new RegExp(req.query.name , 'i');
     try{
       const authors = await Author.find(searchOptions);
       res.render('authors/index' , { 
        authors : authors, 
        searchOptions: req.query
     });
     }
     catch(err){
        res.redirect('/');
        }
     });
//Author.find(searchOptions); yahan object kyon ni banaya because searchoption khud me hi ek object hai isliye {} karke likhni ki zarurat ni padi
//ye jab jo searchoption wala kiye hai ye mongodb humko feature deta hai
//get se info query ke form me aati hai
//regExp ka matlab adha puna naam pe bhi pura naam dega aur i ka matlab case sensititity ni checkj karega
//render me jo { key : value,key2:value2} karke jo  hejte hain wo ejs file me jaata hai aur wo use kar sakta hai
//is case me usne as a value searchOption.name ko use kiya hai


//Author is model here


//2.new author route
router.get('/new',(req,res)=>{
    //I will take input and try to insert data into database
    //db.users.insert({author : req.body.name})
    res.render('authors/new',{ author : new Author() })
});
//new Author create new author


router.post('/',async (req, res) => {
    const author = new Author({
        name: req.body.name
    });
    try{
      const newAuthor = await author.save();
       res.redirect('authors');
    }
    catch(err){
        res.render('authors/new', {
            author: author,
            errorMessage: err.message
        })
    }
});

  

//kewal iske liye pehle body-parser npm install karna pada
//aur phir import kiya
//app.use(bodyParser.urlencoded({ limit : '10mb',extended : false }))
//agar user id bheje to kahin wo  na reset ho jaaye isliye hum specify kar rahe above req.body.name

module.exports = router;


//**route or controllers will have a single file and in the views we have all the files for a single route controller
//save is handled by promise and not by callback function 

















module.exports = router
//always remember to export this router so that our main file can get access to it
//always look at what are the errors and act accordingly 



// below is implemntaion of async await code in Promise.then
//3.create author route
// router.post('/', (req, res) => {
//     const author = new Author({
//         name: req.body.name
//     });
//     author.save()
//         .then(() => {
//             res.redirect('authors');
//         })
//         .catch((err) => {
//             res.render('authors/new', {
//                 author: author,
//                 errorMessage: err.message
//             })
//         })
// });


//POST request send information through body while GET request sends information through query


// let searchOptions = { };
// if(req.query.name != NULL && req.query.name !== " ")
//jab bhi search karte hai to aisa hi karna hota hai


// searchOptions.name =  new RegExp(req.query.name , 'i');
//Regexp usme madad karta hai jaise ay type karne par bhi ayush show hota hai aur i ka significance ye  hai ki ye case insensitive nahi rakhega search ko