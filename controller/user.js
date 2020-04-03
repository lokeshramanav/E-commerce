const jwt = require('jsonwebtoken'); //generate signed token
const expressJwt = require('express-jwt'); //authorisation check
const User = require('../models/user');
const {errorHandler} = require('../helper/dbErrorHandler');

exports.sayHi = (req, res)=>{
    res.json({message:'Hello World from Node !!!'});
};

exports.addUser = (req , res)=>{   //signup new user 
       const user = new User(req.body);       
       user.save((err, user)=>{
            if (err){
                console.log(err)
                res.status(400).json({err : errorHandler(err)});
            }
            else{
                res.json({user});
            }
            
       })
         
}

exports.signin = (req, res)=>{
   const {email, password} = req.body;
   User.findOne({email},(err, user)=>{
        if (err || !user){
            return res.status(400).json({
                error: 'User with that email does not exist!!!'
            })
        }
        if(!user.authenticate(password)){
            return res.status(404).json({err: 'Email and Password dont match'})
        }
        //create a token
        const token = jwt.sign({_id: user.id}, process.env.JWT_SECRET)

        //persist the token in cookie wu=ith expiry date
        res.cookie('t', token , {expire: new Date() + 9999 })

        //return response with user and token to frontend client
        const {_id , name, email, role} = user;

        return res.json({token , user: {_id , name, email, role }});

   });
}

exports.signOut =  (req, res)=>{
    res.clearCookie('t');
    res.json({message: 'User has signedOut'});

}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.isAuth = (req, res, next)=>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user){
        return res.status(403).json({error: 'Access denied!!!'});
    }
    next();
};

exports.isAdmin = (req, res, next)=>{
    if(req.profile.role === 0){
        return res.status(403).json({error: 'Admin Privileges access denied!!'});
    }
    next();
}