const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const app = express();  


mongoose.connect(process.env.DATABASE , 
    {useNewUrlParser: true,
    useCreateIndex: true}).then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
        console.log(`DB connection error: ${err.message}`)
      })
      
app.get('/',(req,res)=>{
    res.send('Hello World!!!');
})

const port = process.env.PORT || 5500;

app.listen(port , ()=>{
    console.log(`Server is running at PORT: ${port}`);
})