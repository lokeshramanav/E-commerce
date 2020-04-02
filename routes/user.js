const express = require('express');
const router = express.Router();

const {sayHi , addUser , signin , signOut}  = require('../controller/user');
const {userSignUpValidator} = require('../validator/index');

router.get('/', sayHi);

router.post('/adduser', userSignUpValidator , addUser);

router.post('/signin', signin);

router.get('/signout' , signOut)

module.exports= router;