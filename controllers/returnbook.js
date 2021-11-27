const mysql = require('mysql');

const CircularJSON = require('circular-json');

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

 
exports.getnotreturnbook = (req, res)=>{
        
    
     db.query('SELECT * FROM issuebook where status = "notreturned"',(error,results)=>{
            if(error){
                console.log(error);
            }
            else{
                
               
                return res.render('returnbookdetails',{data:results})

                
              
                  
            } 
        });
   
    
} 
  


exports.getbook = (req, res)=>{
      
     
    let payload = req.body.payload.trim();
     
    
   let search =  db.query('SELECT * FROM books WHERE Book_title LIKE "%'+payload+'%"', async (error,result)=>{
        if(error){
            console.log(error);
        }
        else{
              
            //console.log(result)
            const str = CircularJSON.stringify(result);
     
   
            res.send({payload:JSON.parse(str)});
           
        } 
    });
    
    //search = search.s(0,10);
   

} 

 
exports.getsearchedbook = (req, res)=>{
      
     
    var para = req.body.option;
   
    stringPart = req.body.term;
 
    db.query('SELECT * FROM books WHERE '+para+' LIKE "%'+stringPart+'%"',function(err, rows, fields) {
        if (err) throw err;
      
        
       
        //res.send(JSON.stringify(rows));
      //console.log(rows)
        return res.render('addissuedbook',{
          
            result:rows,
        }); 
    });
   

}


 
exports.addreturnbook = (req, res)=>{
    var id= req.body.id;
    var bookname= req.body.bookname;
    var isbn= req.body.isbn;
    var author= req.body.author;
    var idate = req.body.idate;
    var duedate= req.body.duedate;
    var rdate = req.body.rdate;
    var username = req.body.username;    
    var mobile=req.body.mobile;
    var issueid=req.body.id;
    var bookid=req.body.bookid;
    var status = "returend";
    var updateData={issueid:id,bookname:bookname,bookid:bookid,isbn:isbn,authors:author,issuedate:idate,duedate:duedate,returndate:rdate,username:username,mobile:mobile}
 
    var sql = `UPDATE issuebook SET status=? WHERE id = ?`;
    db.query(sql, [status, id], function (err, data) {        
    if (err) throw err;
    db.query('INSERT INTO returnbook SET ?',[updateData],async(error,results)=>{
        if(error){
            console.log(error);
        }
        
    });
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/returnnbookdetails');
  
     
      
     
      
    
}
   
exports.getreturnbooklist = (req, res)=>{
        
    db.query('SELECT * FROM returnbook',(error,results)=>{
           if(error){
               console.log(error);
           }
           else{
               
               return res.render('bookreturnlist',{returndata:results})

               
             
                 
           } 
       });
  
   
} 