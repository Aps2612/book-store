if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');

mongoose.connect(process.env.mongodb);

const db = mongoose.connection

db.on('error',(error)=>console.error(error.meesage));
db.once('open',()=> console.log("connected to database"));

app.set('view engine','ejs')

app.set('views',__dirname+'/views')
app.set('layouts','layouts/layout')

app.use(expressLayout)
//express.static() is used when want show some static file from some folder
app.use(express.static('public'));

const bookRouter = require('./routes/books');
//this is how we import
//after require we write the path of our file 
app.use('/',bookRouter)
//isme jo pehla parameter hai wo decide karega path kya hoga
//agr /books likha hota to routes me path /books/{route_path_name} check karega


app.listen(4000);

//ejs-layout ka yeh fayda hai ki baar baar boilerplate ni lagana padega HTML banate waqt
//humko jo file render wo sidha  render kar denge
//humara code layout wale file me jayega aur wahan <%-body%> se jo file render kiye hain wo chal jayega

 