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

//SHOW ROUTE
router.get('/:id',(req,res)=>{
   res.send(`Show author with  ${req.params.id}`);
});

//EDIT ROUTE
router.get('/:id/edit', async (req, res) => {
    try {
      const author = await Author.findById(req.params.id)
      res.render('authors/edit', { author: author })
    } catch {
      res.redirect('/authors')
    }
  })
//editing route is almost similar to new but instead of creating new author we will get the author from database and edit it
//whenever we have to fetch something from database we use async await function and write our code in tryu catch block
//execute try if no error else catch error and show it



//UPDATE ROUTE
router.put('/:id', async (req, res) => {
    let author
    try {
      author = await Author.findById(req.params.id)
      author.name = req.body.name
      await author.save()
      res.redirect(`/authors/${author.id}`)
    } catch {
      if (author == null) {
        res.redirect('/')
      } else {
        res.render('authors/edit', {
          author: author,
          errorMessage: 'Error updating Author'
        })
      }
    }
  })
  //this is is similar as that of create route 
  //here we dont want to create a new author 
  //we want to get existing user and we can get it under try block by passing id
  //we will use async function and will use await till we get the author id
  //author = await Author.findById(req.params.id) will use mongoose database to get the user
  //if everything is successfull we want to redirect to show page
  //author.name = req.body.name
  //await author.save() these to update 
  //Q)why we have defined author variable outside the try block?You should have used const author instead
  //Ans) It is because we have used that author variable inside catch block so we need to define it outside by let
  // because code can fail twice-
  //1.while getting author from database
  //2.while saving author to database
  //if author == null shows we failed at getting author from database and so we redirected to home page bcoz author does not exist 
  //else condition shows we got author from database but were not able to save it to database 

  //Q)what is difference between /authors and just 'authors'
  //Ans) Just 'authors' withot slash at front means authors/authors here which is wrong so we do slash at front

  //author.name = req.body.name saves the name before going to update page 




router.delete('/:id',(req,res)=>{
    res.send('Delete author with');
})
//this is route for deleting the particular author

//we cant directly use put or delete as a method so we need to install method-override
//from the browser we can only make get or put request
  

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