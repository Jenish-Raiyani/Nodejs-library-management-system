const express = require('express');
const mysql = require('mysql');
const app = express();
const dotenv =require('dotenv');
const path= require('path');

dotenv.config({path:'./.env'});

const db= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE,

});




const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine','hbs');
db.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Database Connected")
    }

});
var session = require('express-session');
 

app.use(session({
  secret : 'ABCDefg',
  resave : false,
  saveUninitialized : true
}));
//routes

app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));
app.use('/addbook',require('./routes/addbook'));
app.use('/',require('./routes/managelocation'));
app.use('/',require('./routes/searchbook'));
app.use('/',require('./routes/members'));
app.use('/',require('./routes/issuebook'));
app.use('/',require('./routes/returnbook'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));




 
/*
app.get('/', (req,res)=>{

    res.render('index')
});
app.get('/register', (req,res)=>{

    res.render('register')
});
*/

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Server started")
})

// DATABASE = sql3453626
// DATABASE_HOST = sql3.freesqldatabase.com
// DATABASE_USER = sql3453626
// DATABASE_PASSWORD = 9fBE8geDyW

// DATABASE = "librarydb"
// DATABASE_HOST = localhost
// DATABASE_USER = root
// DATABASE_PASSWORD = 
