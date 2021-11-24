const mysql = require('mysql');

const CircularJSON = require('circular-json');

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
       // console.log("Database Connected")
    }

});
exports.getsearchedbook = (req, res)=>{
      
     
        let payload = req.body.payload.trim();
        
       let search =  db.query('SELECT * FROM books WHERE Book_title LIKE "%'+payload+'%"', async (error,result)=>{
            if(error){
                console.log(error);
            }
            else{
                  
                //console.log(result)
                const str = CircularJSON.stringify(result);
         
       
                res.send({payload:JSON.parse(str)});
                return res.render('bookdetails',{
          
                    layout: 'bookdetails'
                }); 
            } 
        });
        
        //search = search.s(0,10);
       
    
} 

exports.searchresult = (req, res)=>{
      
     
    var para = req.body.option;
   
    stringPart = req.body.term;
 
    db.query('SELECT * FROM books WHERE '+para+' LIKE "%'+stringPart+'%"',function(err, rows, fields) {
        if (err) throw err;
      
        
       
        //res.send(JSON.stringify(rows));
      //console.log(rows)
        return res.render('searchresult',{
          
            result:rows, layout: 'searchresult'
        }); 
    });
   

}