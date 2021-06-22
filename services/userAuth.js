const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticateUser = (req,res)=>{
    user.findOne({userName: req.body.userName}).then((result)=>{
        if(result == null){
            res.locals.validUser = false;
        }
        else{
            res.cookie('jwt', createToken(result._id), {maxAge: 100*60*60, httpOnly: true});
            res.redirect('/home');
        }
    }).catch(err=>{
        throw new Exceptin("error occured while trying to log in : " + err);
    });
}

const createToken = (id)=>{
    return jwt.sign({id: id}, process.env.jwtSecret);
}

const userAuthorization = (req, res, next)=>{
    if(req.cookies["jwt"] == null){
        return res.sendStatus(401);
    }
    jwt.verify(req.cookies["jwt"], process.env.jwtSecret, (err, decoded)=>{
        if(err){
            return res.sendStatus(403);
        }
        console.log(decoded);
        next();
    });
}

module.exports = {
    authenticateUser,
    userAuthorization
}