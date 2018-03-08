const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const NodeMailer = require('nodemailer');

const app = express();

// View engine setup

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware

app.use(bodyParser.urlencoded( { extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/send', (req, res) => {
    const output = `
        <p> You have a new contact request </p>
        <h3>Contact Details </h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Company: ${req.body.company}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>`;



        let transporter = NodeMailer.createTransport({
            host: 'mail.hiddentigermusic.com',
            port: 587,
            secure: false, 
            auth: {
                user: 'info@hiddentigermusic.com',
                pass: 'gelaronte1'
            },
            tls: {
                rejectUnauthorized: false
            }
        });


            let mailOptions = {
                from: '"Nodemailer Contact" <info@hiddentigermusic.com>', // sender address
                to: 'info@hiddentigermusic.com', 
                // to: 'bbeez8500@gmail.com', 
                subject: 'Node Contact Request', 
                text: 'Hello world?', 
                html: output
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', NodeMailer.getTestMessageUrl(info));

                res.render('index', {msg: 'Email has been sent'});
                // res.redirect('/');

            });
});

app.listen(3000, () => console.log('server started'));



