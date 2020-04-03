const express = require('express');
const router = express.Router();

const {sayHi , addUser , signin , signOut , requireSignin }  = require('../controller/user');
const {userSignUpValidator} = require('../validator/index');

router.get('/', sayHi);

router.post('/adduser', userSignUpValidator , addUser);

router.post('/signin', signin);

router.get('/signout' , signOut)

router.get('/helloUser', requireSignin, (req,res)=>{
    res.send('Hello world User').json();
})

module.exports= router;