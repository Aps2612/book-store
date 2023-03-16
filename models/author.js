//model handles data logic
//interacts with database
//it sends back the response to the controller
//it does not directly interact with view 

const mongoose = require('mongoose');
const Book = require('./book');

const authorSchema = new mongoose.Schema({
  name:{
   type: String,
   required:true
  } 
})

// authorSchema.pre('remove', function(next) {
//   Book.find({ author: this.id }, (err, books) => {
//     if (err) {
//       next(err)
//     } else if (books.length > 0) {
//       next(new Error('This author has books still'))
//     } else {
//       next()
//     }
//   })
// })

//always use this techniwue when u delete something from database when we have other model referencing them

//we use pre which will allow us to run a method before certain action occurs
//authorSchema.pre('remove', function(next) 
//this will make sure that function next gets executed before we actually remove the author

//Q)why we did not use arroe function
//ans) because we want to access author using this object pointer which can't be done in arrow function

//what is next
//it is a callback anddd if it gives error we will not proceed further else we wll proceed furthrt using next

//why do we need book module
//It is because so that we can find a book for particuar author

//{ author: this.id } will check that the author we are going to remove has any book to its name or not
//(err, books) is a callback function that gets executed after find author with the id

//if(err) we had trouble finfing the author 
//next(err) will pass to next function with error and prevent author from getting removed

//if books.length>0 that means that author has some books and we cant delete it
//So we will call next function and pass an error and it will prevet from removing particular aurhor

//if there is no error and we dont have any books then we can remove author

authorSchema.pre("deleteOne", async function (next) {
  try {
      const query = this.getFilter();
      const hasBook = await Book.exists({ author: query._id });

      if (hasBook) {
          next(new Error("This author still has books."));
      } else {
          next();
      }
  } catch (err) {
      next(err);
  }
});

//For the author delete route, if you are not using 'author.remove()' (which is deprecated), you might encounter some problem in the 'authorSchema.pre()' function. 
//if you use 'this._id' does not work, it gives you undefined.



module.exports = mongoose.model("author",authorSchema);