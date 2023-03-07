if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
//1.open compass
//2.form there copy uri and paste it in .env file without quotes
// URI =  mongodb://0.0.0.0:27017 try this
//3.mongoose.connect(process.env.mongodb); to coonnect to database
//4.store .env in gitignore file


const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
//import express and run express
//ejs-layout ka yeh fayda hai ki baar baar boilerplate ni lagana padega HTML banate waqt
//humko jo file render wo sidha  render kar denge
//humara code layout wale file me jayega aur wahan <%-body%> se jo file render kiye hain wo chal jayega


const indexRouter = require('./routes');
const authorRouter = require('./routes/authors');
//this is how we import 
//after require we write the path of our file



app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayout)
app.use(express.static('public'));  
//view engine is used for ejs file(ejs is a template engine)   
//we need to set the path one alternative way is `__dirname{views}`
//what third line will do is that it will execute layout function no matter which view file I have called 
//to stop the effect of layout, use {layout:false}
//express.static() is used when want show some static file from some folder




const mongoose = require('mongoose');
mongoose.connect(process.env.mongodb);
const db = mongoose.connection
db.on('error',(error)=>console.error(error.meesage));
db.once('open',()=> console.log("connected to database"));
//connect mongoose ,store in db,and handled both success and failure state





 
app.use('/',indexRouter)
app.use('/authors',authorRouter);
//isme jo pehla parameter hai wo decide karega path kya hoga
//agr /authors likha hota to routes me path /authors/{route_path_name} check karega


app.listen(4000);
//listens on port number 4000


 