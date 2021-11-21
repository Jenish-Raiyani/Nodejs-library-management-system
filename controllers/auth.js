const mysql = require('mysql');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
       // console.log("Database Connected")
    }

});
exports.register = (req, res)=>{
    console.log(req.body);
   
    /*
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const passwordConfirm=req.body.passwordConfirm;*/

    const {name,email,password,passwordConfirm} = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error,result)=>{
        if(error){
            console.log(error);
        }
       
        if( result.length > 0){
            return res.render('register',{
                message: "Email is already in use",layout:'register'
            });
        }
        else if(password !== passwordConfirm){
            return res.render('register',{
                message: "Password do not match",layout:'register'
            });

        }
        let hashedpassword = await bcrypt.hash(password,8);
        console.log(hashedpassword);

        db.query('INSERT INTO users SET ?',{username:name,email:email,password:hashedpassword},(error,results)=>{
            if(error){
                console.log(error);
            }
            else{
                return res.render('register',{
                    message: "Register successfully", layout:'register'
                });  
            } 
        });
    }); 

    //res.send("Form submitted")
} 

exports.login = (req, res)=>{
    console.log(req.body);

    var email = req.body.email;
    var password = req.body.password;

    var sql = 'select * from users where email = ?;';

    db.query(sql,[email],function(err,results,fields){
        if(err) throw err;

        if(results.length && bcrypt.compareSync(password,results[0].password)){
           req.session.email = email;
           
            res.redirect('/dashboard');
         
          
            return res.render('index',{
                message: "Welcome , "+ req.email
            });
        }
        else
        {
            
            return res.render('login',{
                message: "Email or Password Incurrect" , layout:'login'
            });

        }
    })
   
    

    //res.send("Form submitted")
} 