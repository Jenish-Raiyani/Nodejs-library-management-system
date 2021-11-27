const mysql = require('mysql');
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
        console.log("Database Connected")
    }

});

 
exports.memberslist = (req, res)=>{
        
     db.query('SELECT * FROM members',(error,results)=>{
            if(error){
                console.log(error);
            }
            else{
               
                return res.render('members',{
                    members: results
                });  
                  
            } 
        });
   
    
} 
 

exports.addmember = (req, res)=>{
   
    
    const {name,gender,birthdate,mobile,aadhaar,address,city,pincode,email} = req.body;
     db.query('INSERT INTO members SET ?',{name:name,gender:gender,birthdate:birthdate,mobileNo:mobile,aadhaar:aadhaar,address:address,city:city,pincode:pincode,email:email},async(error,results)=>{
            if(error){
                console.log(error);
            }
            else{
              
                return res.render('addmember',{
                    message: "Member Added successfully"
                }); 
                    
                
                  
            }
        
        });
   
    
} 

exports.adddetails = (req, res)=>{

    return res.render('addmember'); 
   
    
   
}
 
   
    
   
    
 