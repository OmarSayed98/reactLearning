const express = require('express');
const router = express.Router();
const user = require('../models/user');
const {userCreation} = require('../services/userAuth');
router.get('/',(req, res)=>{
    res.render('signup');
});
router.post('/',(req, res)=>{
    try{
        userCreation(req.body).then(result=>{
            res.send('hello '+result.userName);
        }).catch(err=>{
            res.send(err.message);
        });
    }
    catch(err){
        res.send(err);
    }
});
module.exports = router;