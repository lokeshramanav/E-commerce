const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const userRoutes = require('./routes/user');
const userAftRoutes = require('./routes/userAfterAuth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product'); 

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
app.use(cors());

app.use('/user',userRoutes);
app.use('/userRoutes', userAftRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

const port = process.env.PORT || 5500;

app.listen(port , ()=>{
    console.log(`Server is running at PORT: ${port}`);
})