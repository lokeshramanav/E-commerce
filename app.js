const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const userRoutes = require('./routes/user');

const app = express();  


mongoose.connect(process.env.DATABASE , 
    {useNewUrlParser: true,
    useCreateIndex: true}).then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
        console.log(`DB connection error: ${err.message}`)
      })
      
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

app.use('/user',userRoutes);

const port = process.env.PORT || 5500;

app.listen(port , ()=>{
    console.log(`Server is running at PORT: ${port}`);
})