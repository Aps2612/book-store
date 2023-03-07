//model handles data logic
//interacts with database
//it sends back the response to the controller
//it does not directly interact with view 

const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name:{
   type: String,
   required:true
  }
})

module.exports = mongoose.model("author",authorSchema);