const mongoose = require('mongoose');
const express = require('express');
const app = express();
const routerApi = require('./src/routes');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Active port', port));

mongoose
  .connect(process.env.MONGODB_STRING_CONNECTION)
  .then(() => console.log('Success connection with mongo'))
  .catch((error) => console.error(error));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

//Actividad de whatsapp
client.messages
  .create({
    mediaUrl: ['https://aldawe.co/wp-content/uploads/2018/12/colombia-1460312_1920.jpg'],
     from: 'whatsapp:+14155238886',
     body: 'Actividad de Whatsapp',
     to: 'whatsapp:+573215702977'
   })
  .then(message => console.log(message.sid));

const email = require('./src/Mail')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


app.use(express.json())
app.use(express.urlencoded({extended:false}))

/* Creación de la ruta del proyecto */
/* http://localhost:5000/ */
app.get('/', (req,res)=>{
  res.json({message:'Success'})
})

app.post('/api/email/confirmacion', async(req,res,next)=>{
  try {
    res.json(await email.sendOrder(req.body))
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({'message': err.message})
  return
})


app.use(express.json());

routerApi(app);