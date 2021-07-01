const user = require('../models/user');
const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');
const bcrypt = require('bcrypt');


const authenticateUser = (req)=>{
    return new Promise((resolve, reject)=>{
        user.findOne({userName: req.body.username}).then((result)=>{
            if(result == null){
                reject("invalid username or password");
                return;
            }
            else{
                bcrypt.compare(req.body.password, result.password).then((result1)=> {
                    if(!result1){
                        reject("incorrect username or password");
                        return;
                    }
                    jwt.sign({id: result._id}, process.env.jwtSecret, function(err, token){
                        if(err){
                            reject(err);
                            return;
                        }
                        //res.cookie('jwt', token, {maxAge: 100*60*60, httpOnly: true});
                        resolve(token);
                        return;
                    });
                }).catch(err=>{
                    reject("failed to compare passwords" + err);
                    return;
                });
            }
        }).catch(err=>{
            reject("error occured while searching for user "+err);
            return;
        });
    });
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

const userCreation = (body)=>{
    return new Promise((resolve, reject)=>{
        user.findOne({$or:[{email: body.email},{userName:body.username}]}).then(res=>{
            if(res){
                if(res.email == body.email)
                    reject(new Error("email already exists"));
                else
                    reject(new Error("username already exists"));
                return;
            }
            User = new user({
                userName:body.username,
                password:body.password,
                email:body.email,
                dateOfBirth:body.age
            });
            User.save().then(result=>{
                resolve(result);
                return;
            }).catch(err=>{
                reject(new Error("failed to save user "+err));
                return;
            });
        }).catch(err=>{
            reject(new Error("failed to save user "+err));
            return;
        });
    });
}

module.exports = {
    authenticateUser,
    userAuthorization,
    userCreation
}