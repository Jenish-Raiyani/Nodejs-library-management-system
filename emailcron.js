const cron = require('node-cron');
 
const shell = require('shelljs');
const express = require('express');
const dotenv =require('dotenv');
const Vonage = require('@vonage/server-sdk')
const vonage = new Vonage({
  apiKey: " ",
  apiSecret: " "
})
const app = express();

dotenv.config({path:'./.env'});

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
        
    }

});
// ...

// Backup a database at 11:59 PM every day.
cron.schedule('* * * * * ', function() {
    console.log('---------------------');
    console.log('Running Cron Job');
       
  
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
                 user: ' ',
                   pass: ' '
                }
              });

            var mailOptions = {
                from: ' ',
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
            else{
              
                const from = "Library"
                const to = "917573864415"
                const text = `Hello ${row.username} Please Return ${row.bookname} Book `

                vonage.message.sendSms(from, to, text, (err, responseData) => {
                if (err) {
                      console.log(err);
                } else {
                if(responseData.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
              }
            }
})
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
  
  app.listen(3000);