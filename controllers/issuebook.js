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

 
exports.addissuedbook = (req, res)=>{
        
     db.query('SELECT * FROM books',(error,results)=>{
            if(error){
                console.log(error);
            }
            else{
               
                return res.render('addissuedbook')

                
              
                  
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


 
exports.getformbookdetials = (req, res)=>{
      
    var BookId= req.params.id;
    var sql=`SELECT * FROM books WHERE id=${BookId}`;
    db.query(sql, async (err, data)=> {
        if (err) throw err;
        db.query('SELECT * from members',async (error,result)=>{
            if(error){
                console.log(error);
            }
             
            return res.render('issuebookform.hbs', { title: 'Issued Book', bookdata: data[0],members:result});
            
        });
      
     
      
    });
   

}

exports.submitdetails = (req, res)=>{
    var bookid= req.params.id;
    const {title,isbn,author,idate,duedate,username,mobile,email} = req.body;
    db.query('INSERT INTO issuebook SET ?',{bookname:title,bookid:bookid,ISBN:isbn,author:author,issuedate:idate,duedate:duedate,username:username,mobile:mobile,email:email},(error,results)=>{
           if(error){
               console.log(error);
           }
           else{
             
               return res.render('issuebookform',{
                   message: "Details Added successfully"
               });  
                 
           } 
       });
  
   

}
 



exports.getlist = (req, res)=>{
        
    db.query('SELECT * FROM issuebook',(error,results)=>{
           if(error){
               console.log(error);
           }
           else{
               
               return res.render('issuebooklist',{issuedata:results})

               
             
                 
           } 
       });
  
   
} 