
const mysql = require('mysql');

var hbs = require("hbs")
hbs.registerHelper("equal", require("handlebars-helper-equal"))
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
exports.booklocation = (req, res)=>{
    
    var BookId= req.params.id;
   
    
    var sql=`SELECT * FROM booklocation WHERE bookid=${BookId}`;
        db.query(sql, function (err, data) {
          if (err) throw err;
   
          return res.render('updatelocation', { title: 'Book List', Bookdata: data });
          
        });
 
} 
 
exports.updatebooklocation = (req, res)=>{
    
    var BookId= req.params.id;
    var location = req.body.location;
    var status = req.body.status;
    var rowid = req.body.rowid;
 
    
  //  var sql=`update location,status FROM booklocation WHERE bookid=${BookId}`;
    var sql = `UPDATE booklocation SET location = '${location}', status = '${status}' WHERE rowid = '${rowid}'`;
        db.query(sql, function (err, data) {
          if (err) throw err;
   
          //res.redirect(`/booklocation/updatelocation/${BookId}`);
          res.send(`<script>
     
          window.location.href="/booklocation/updatelocation/${BookId}";
          alert("Location Updated Successfully");

  </script>`);

          
        });
 
} 
   
    
 exports.getbook = (req, res)=>{
  
  
  
   
    
    var BookId= req.params.id;
    
    var sql=`SELECT * FROM books WHERE id=${BookId}`;
        db.query(sql, function (err, data) {
          if (err) throw err;
          //console.log(blocation)
          Object.keys(data).forEach(function(key) {
            var row = data[key];
           
            totalbook=row.Total_copies;
            
          });
        
          
           
          var arr = [];
          
            for (var i = 1; i <= totalbook; i++) arr.push(""+i);
            
          
          return res.render('managelocation', { title: 'Book List', Bookdata: data ,totalbook:arr});
          
        });


    
 };


 exports.addlocation = (req, res,next)=> {
   

   var BookId= req.params.id;
   /*
   var sql=`SELECT * FROM books WHERE id=${BookId}`;
   db.query(sql, function (err, data) {
     if (err) throw err;
     Object.keys(data).forEach(function(key) {
       var row = data[key];
       isbn=row.ISBN;
       title=row.Book_title;
       authors=row.Authors;
       publisher=row.Publisher;
       url=row.url;
      // console.log(isbn,title,authors,publisher,url);
       
     });
    });*/
    console.log(req.body)
    var isbn= req.body.isbn;
    var title= req.body.title;
    var authors= req.body.authors;
    var location = req.body.location;
    var status = req.body.status;
    var publisher = req.body.publisher;
    var url= req.body.url;
    var rowid=req.body.rowid;
    var totalcopies=req.body.totalbook;
    var bookno=req.body.bookno;
    
  //   console.log(status,location)
  db.query('SELECT rowid FROM booklocation WHERE rowid = ?', [rowid], async (error,result)=>{
    if(error){
        console.log(error);
    }
   
    if( result.length > 0){
      res.send(`<script>
     
      window.location.href="/booklocation/managelocation/${BookId}";
      alert("Location of book number ${bookno} is already exit");
    
      </script>`);
      //res.redirect(`/booklocation/managelocation/${BookId}`);
     // window.location.href = `http://mywebsite.com/home.html`;
    
      return res.render('managelocation',{
        message: "Already Exit"
        
      });
    }
    else {
      db.query('INSERT INTO booklocation SET ?',{rowid:rowid,bookid:BookId,ISBN:isbn,title:title,totalcopies:totalcopies,authors:authors,publisher:publisher,url:url,location:location,status:status},(error,results)=>{
        if(error){
            console.log(error);
        }
        else{
            //res.redirect(`/booklocation/managelocation/${BookId}`);
            res.send(`<script>
     
                    window.location.href="/booklocation/managelocation/${BookId}";
                    alert("Location Added Successfully For Book Number ${bookno}");
    
            </script>`);
            
  
            //console.log("Location Added");
            return res.render('managelocation',{
              message: "Location Added Successfully"
            });
             
        } 
  
    });
    

    }
    

   
}); 
 };
   
    
 