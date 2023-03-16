const express = require('express')
const router = express.Router()
// const multer = require('multer')
// const path = require('path')
// const fs = require('fs')
const Book = require('../models/book')
const Author = require('../models/author')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
// const upload = multer({
//   dest: uploadPath,
//   fileFilter: (req, file, callback) => {
//     callback(null, imageMimeTypes.includes(file.mimetype))
//   }
// })
//Book aur Author purpose is to get their schemas from the models
//imageMimeTypes are types of images that we want in our file to be accepted
//uploadPath is deatination of where my file is going to be stored 
//for the purpose of joining imagebasepath and upload we imported path
//Multer allows us to work on different file formats and file is one of them

//the dest option is set to uploadPath, which specifies the directory where uploaded files will be stored.
//The fileFilter option is also specified, which is a function that will be called for each uploaded file to determine whether or not the file should be accepted. 
//The function takes three arguments: req, file, and callback. req is the HTTP request object, file is the file object, and callback is a function that should be called with two arguments: error and acceptFile
//If error is null and acceptFile is true, the file will be accepted and uploaded. Otherwise, the file will be rejected and an error will be thrown.
//In this particular fileFilter function, it checks if the file.mimetype is included in the imageMimeTypes array.
//If it is, then the callback is called with null as the error argument and true as the acceptFile argument, indicating that the file should be accepted. 
//If the mimetype is not in the array, then callback is called with null as the error argument and false as the acceptFile argument, indicating that the file should be rejected.

//lster in our code we have used filepond so we do not need to worry about multer and we can remove multer libraray





// All Books Route
router.get('/', async (req, res) => {
  let query = Book.find()
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('publishDate', req.query.publishedBefore)
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
    query = query.gte('publishDate', req.query.publishedAfter)
  }
  try {
    const books = await query.exec()
    res.render('books/index', {
      books: books,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

//The route handler uses async/await to asynchronously search for books in a MongoDB database using the Mongoose library.
//If the name query parameter is present in the HTTP request (i.e., the user has searched for books by name), the route handler adds a search filter to searchOptions to perform a case-insensitive regular expression search for the book name.
//If the search is successful, the books array returned from the database search is passed as a context variable to a template engine to render the view.
//The searchOptions object is also passed as a context variable, which allows any previous search queries to be displayed in the search form on the view.
//Finally, the res.render() method is called to render the 'books/index' view template, which displays a list of books based on the search query.



// New Book Route
router.get('/new', async (req, res) => {
    renderNewPage(res, new Book())
  })






 
// Create Book Route
router.post('/',  async (req, res) => {
  //const fileName = req.file != null ? req.file.filename : null//taken care by save file
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    //coverImageName: fileName,taken care by save file
    description: req.body.description
  })
  saveCover(book,req.body.cover)

  try {
    const newBook = await book.save()
    // res.redirect(`books/${newBook.id}`)
    res.redirect(`books`)
  } catch {
    // if (book.coverImageName != null) {
    //   removeBookCover(book.coverImageName)
    // }//we have removed this because if it gets error it will not be saved in book so wo do not don't need to remove it explicitly
    renderNewPage(res, book, true)
  }
})
//The route handler takes advantage of the multer middleware that was defined earlier to handle file uploads. 
//The upload.single() method is used to specify that only a single file with the field name 'cover' will be uploaded in the form.
//we have removed this later because we are  not geeting a file but a siomple string in the form of json object 
//The uploaded file is saved to the server and assigned a unique filename, which is stored in req.file.filename.
//The route handler then creates a new Book object using the data submitted in the form, including the filename of the uploaded cover image.
//The Book object is saved to the MongoDB database using the save() method, which is an asynchronous operation.
//If the book is saved successfully, the user is redirected to the '/books' URL path to view the list of all books. 
//If there is an error during the saving process, the catch block is executed.
//If an error occurs during the saving process, the catch block is executed. The catch block checks whether a cover image was uploaded and deletes it if it was, to prevent orphaned files on the server.
//It then calls the renderNewPage() function to render the 'books/new' view template with an error message and the submitted form data pre-populated.


// function removeBookCover(fileName) {
//   fs.unlink(path.join(uploadPath, fileName), err => {
//     if (err) console.error(err)
//   })
// }



async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({})
    const params = {
      authors: authors,
      book: book
    }
    if (hasError == true)  params.errorMessage = 'error while books';
    res.render('books/new', params)
  } catch(err) {
    res.redirect('/books')
  }
}
//The function begins by calling the Author.find() method to retrieve all authors from the MongoDB database using the Mongoose library.
//This is an asynchronous operation, so the function uses await to wait for the operation to complete.
//Once the authors are retrieved, the function creates a params object containing the authors array and the book object passed as an argument. 
//This params object is passed as context variables to the 'books/new' view template.
//If hasError is true, the function also sets an errorMessage property on the params object to be displayed in case of an error during form submission.
//Finally, the res.render() method is called to render the 'books/new' view template with the params object. 
//The Book object passed as an argument to the renderNewPage() function is used to pre-fill the form fields,if any present
//if there is an error during the rendering process, the user is redirected to the '/books' URL path.
//book : book means here the key is book and value is also book
//rendering of new page is done where book and author is passed

function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, 'base64')
    book.coverImageType = cover.type
  }
}

module.exports = router


















