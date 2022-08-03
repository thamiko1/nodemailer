const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res)=>{
    res.render('home')
})

app.post("/send_email", function(req, response){
    var from = req.body.from;
    var to = req.body.to;
    var subject = req.body.subject;
    var message = req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: '', // masukin email
            pass: '' // ini harus ke google account trs search app password, trs generate (harus selesai two step verification dulu)
        }
    });

    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: message
    }
    transporter.sendMail(mailOptions)
})


app.listen(3000,()=>{
    console.log("Listening on port 3000")
})