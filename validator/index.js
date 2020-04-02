exports.userSignUpValidator = (req, res, next)=>{
    req.check('name', 'Name is required').notEmpty();
    req.check('email', 'Email must be between 3 to 32 charackter').isLength({min:4,max:32});
    req.check('password','Password must not be empty').notEmpty()
    req.check('password').isLength({min:6}).withMessage('Pasword must contain at least 6 character');

    const errors = req.validationErrors();
    if (errors){
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError});
    }
    next();
}


//errors