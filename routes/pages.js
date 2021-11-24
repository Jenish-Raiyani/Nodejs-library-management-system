const express = require('express');
const router = express.Router();

const mysql = require('mysql');

 

const db= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:"sql3453626",

});
 
db.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        
    }

});
router.get('/',(req, res)=>{
var ses = req.session.email;


if(typeof ses !== 'undefined'){
  
  res.render('index', {message : 'Welcome, ' + ses, layout: 'index' });
}
else{
  res.render('index',{ layout: 'index' });

}

});

router.get('/register',(req, res)=>{
    res.render('register',{ layout: 'register'});
});

router.get('/searchresult',(req, res)=>{
  res.render('searchresult', {layout:'searchresult'});
});

router.get('/login',(req, res)=>{
    res.render('login',{ layout: 'login'});
});

router.get('/dashboard',(req, res)=>{
  res.render('home');
});


router.get('/logout', function(req, res, next){
    if(req.session.email){
      req.session.destroy();
      res.redirect('/');
    }
  })

router.get('/addbook',(req, res)=>{
 
    res.render('addbook');
});

 





router.get('/booklist',(req, res)=>{

    db.query('SELECT * FROM books',(error,data)=>{
           if(error){
               console.log(error);
           }
           else{        
                  
               return res.render('booklist',{
                 Bookdata: data 
             });                               
           } 
       });    
 } 
   
 );


router.get('/booklist/editbook/:id', function(req, res, next) {
    var BookId= req.params.id;
    var sql=`SELECT * FROM books WHERE id=${BookId}`;
    db.query(sql, function (err, data) {
      if (err) throw err;
     
      return res.render('editbook', { title: 'Book List', editData: data[0]});
    });
});

router.post('/booklist/editbook/:id', function(req, res, next) {
  var id= req.params.id;

  const {isbn,title,edition,copies,author,publisher,url} = req.body;
  var updateData={isbn:isbn,	Book_title:title,Edition:edition,Total_copies:copies,Authors:author,Publisher:publisher,url:url}
 
  var sql = `UPDATE books SET ? WHERE id= ?`;
  db.query(sql, [updateData, id], function (err, data) {
  if (err) throw err;
  console.log(data.affectedRows + " record(s) updated");
});


return res.render('editbook',{
    message: "Book Data Updated Successfully"
});
});

router.get('/booklist/deletebook/:id', function(req, res, next) {
  var id= req.params.id;
    var sql = 'DELETE FROM books WHERE id = ?';
    db.query(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) deleted");
  });
  res.redirect('/booklist');
  
});



//Manage book location

router.get('/booklocation',(req, res)=>{

  db.query('SELECT * FROM books',(error,data)=>{
         if(error){
             console.log(error);
         }
         else{             
             return res.render('booklocation',{
               Bookdata: data
           });                               
         } 
     });    
} 


 
);
router.get('/bookdetails/:id', function(req, res, next) {
  var id= req.params.id;
 
  var sql = 'SELECT * FROM books WHERE id = ?';
  db.query(sql, [id], async (err, data)=> {
  if (err) throw err;
     
    var sqlqu = 'SELECT * FROM booklocation WHERE bookid = ?';
    db.query(sqlqu, [id], function (err, booklocation) {
      if (err) throw err;
       
        return res.render('bookdetails',{
  location: booklocation, Bookdata:data, layout:'bookdetails'
  }); 

              
    
});
    
});


   
 
  
});

module.exports= router;
    