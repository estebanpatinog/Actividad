const express = require('express');
const mongoose = require('mongoose');
const routerApi = require('./src/routes');
const my_app = express();

require('dotenv').config();
const port = process.env.PORT;


my_app.listen(port, () => {
  console.log('Port active', port);
});

mongoose.connect(process.env.MONGODB_STRING_CONNECTION)
.then(()=>console.log('Success connection'))
.catch((error)=>{console.error(error)})

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Prueba desde twilio',
     from: '+15072644219',
     to: '+573215702977'
   })
  .then(message => console.log(message.sid));

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'estebanpatinogaviria@gmail.com', // Change to your recipient
  from: 'esteban.patinog@autonoma.edu.co', // Change to your verified sender
  subject: 'Asunto: Prueba de SendGrid',
  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div class="row">
      <p>
        <small>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quis quam optio maiores nulla incidunt dolore! Maxime sit blanditiis ad pariatur
          voluptatum dolorem adipisci deleniti ratione nesciunt, voluptatibus atque doloremque facere!
        </small>
      </p>
    </div>
    <div class="row">
      <div class="cols6">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Once_Caldas_logo-svg.svg/1200px-Once_Caldas_logo-svg.svg.png" alt="">
      </div>
    </div>
  </body>
  </html>`,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })


my_app.use(express.json());
routerApi(my_app);