const express = require('express');
const mongoose = require('mongoose');
const  messageModel = require('./module/message');
const path = require("path");
require("dotenv").config()

const PORT = 5000;

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("connected to mongodb..");
})

app.get('/health', (req, res) => {
    res.json({
      success: true,
    });
})

app.post('/message',async(req,res) => {
  // const user = req.body.user;
  // const messageType = req.body.messageType;
  // const messageBody = req.body.messageBody;

  const {user, messageType, messageBody } = req.body

  const newMessage = new messageModel({
    user : user,
    messageType : messageType,
    messageBody : messageBody
  })

  const savedMessage = await  newMessage.save();

  res.json({savedMessage});
})

app.get('/message',async(req,res) => {

    const messages =await messageModel.find();

    res.json(messages);
    
} )

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
});

app.listen(PORT , () => {
console.log(`Server is listening on port ${PORT}`);
})