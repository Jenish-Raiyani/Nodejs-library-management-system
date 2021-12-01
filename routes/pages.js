const express = require('express');
const router = express.Router();
const moment = require('moment');
const mysql = require('mysql');
const formatYmd = date => date.toISOString().slice(0, 10);


const db= mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE,


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


router.get('/notification',(req, res)=>{
 
  
  
  
      var sql = 'SELECT * FROM issuebook where status = "notreturned"';
      const obj =  db.query(sql, (err, data)=> {
            if (err) throw err;
            Object.keys(data).forEach(function(key) {
              var row = data[key];
              // console.log(row.issuedate)
              d=row.duedate;
              
              const curent =new Date();
              const issuedate =d;
              const d1 = (moment(issuedate).format('MM/DD/YYYY'));
              const d2 = (moment(curent).format('MM/DD/YYYY'));
              var now = moment(d1),
              end = moment(d2),
              days = now.diff(end, 'days');
              console.log(days)
              const duedate  = (moment(curent).format('DD/MM/YYYY'));
            

              if (days == 2){
                var nodemailer = require('nodemailer');

                var transporter = nodemailer.createTransport({
                service: 'gmail',
                  auth: {
                   user: 'jenishraiyani1212@gmail.com',
                     pass: 'wxpslcoseeitubfh'
                  }
                });

              var mailOptions = {
                  from: 'jenishraiyani1212@gmail.com',
                  to: `${row.email}`,
                  subject:'Return library books',
                  text: `You need to return book ${row.bookname} on ${duedate}`,
                };

              transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
});
                

              }

           
              // slug = d.split('T');
              // console.log(slug);
              // console.log(split(`${d}`, { separator: 'GMT+0530' }));
              // const curent =new Date().toLocaleDateString();
              // const issuedate =d.toLocaleDateString();
            //  console.log(curent);
            //  console.log(issuedate);
             // var d1 = new Date("10/10/2021");
             // var d2 = new Date("20/11/2021");
             
              //var d1 = new Date("21/09/2017");
             // var d2 = new Date("30/09/2017",'DD-MM-YYYY');
             
           
              

             
              
               
             
            });
           
  
});


 

  
});


module.exports= router;
    