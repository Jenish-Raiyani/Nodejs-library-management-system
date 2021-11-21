
const mysql = require('mysql');

 

const db= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:"librarydb",

});
 
db.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Database Connected")
    }

});
exports.books = (req, res)=>{
   
    console.log(req.body);
   
   

    const {isbn,title,edition,copies,author,publisher,url} = req.body;
     db.query('INSERT INTO books SET ?',{isbn:isbn,	Book_title:title,Edition:edition,Total_copies:copies,Authors:author,Publisher:publisher,url:url},(error,results)=>{
            if(error){
                console.log(error);
            }
            else{
                //res.redirect('/addbook');
                return res.render('addbook',{
                    message: "Book Added successfully"
                });  
                  
            } 
        });
   
    //res.send("Form submitted")
} 
 
   
    
 
exports.getbooks = (req, res)=>{
    
   
   
   

    
     db.query('SELECT * FROM books',(error,results)=>{
            if(error){
                console.log(error);
            }
            else{
                //res.redirect('/addbook');
                console.log(results);
                
               /* return res.render('addbook',{
                    message: "Book Added successfully"
                });*/  
                  
            } 
        });
   
    //res.send("Form submitted")
} 
 
   
    
 