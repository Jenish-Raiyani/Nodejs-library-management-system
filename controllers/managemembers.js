
const moment = require('moment');
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
exports.deletemember = (req, res)=>{

    var id= req.params.id;
    var sql = 'DELETE FROM members WHERE id = ?';
    db.query(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) deleted");
  });
  res.redirect('/members');
   
    
   
}

exports.getmemdetails = (req, res)=>{

    var memberid= req.params.id;
    var sql=`SELECT * FROM members WHERE id=${memberid}`;
    db.query(sql, function (err, data) {
      if (err) throw err;

      bdate=data[0];
      const birthdate = (moment(bdate.birthdate).format('YYYY-MM-DD'));
      
     
      return res.render('editmember', { title: 'Edit Members Details', editData: data[0],birthdate:birthdate});
    });
    
   
}
 
 
   
    
   

exports.updatemember = (req, res)=>{
    var id= req.params.id;

    const {name,gender,birthdate,mobile,aadhaar,address,city,pincode,email} = req.body;
    var updateData={name:name,gender:gender,birthdate:birthdate,mobileNo:mobile,aadhaar:aadhaar,address:address,city:city,pincode:pincode,email:email};
   
    var sql = `UPDATE members SET ? WHERE id= ?`;
    db.query(sql, [updateData, id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  
  
  return res.render('editmember',{
      message: "Details Updated Successfully"
  });
}