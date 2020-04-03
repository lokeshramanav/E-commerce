//userById

const express = require('express');
const router = express.Router();
const { userById } = require('../controller/userAfterAuth.js');
const {sayHi , addUser , signin , signOut , requireSignin , isAuth , isAdmin }  = require('../controller/user');

router.param('userId', userById);

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res)=>{
    res.json({
        user : req.profile
    });
});

module.exports = router;