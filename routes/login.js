const express = require('express');
const router = express.Router();
const user = require('../models/user');
const {authenticateUser} = require('../services/userAuth');
router.get('/',(req,res)=>{
    res.render('login');
});

router.post('/',(req,res)=>{
    authenticateUser(req).then(result=>{
        console.log(result);
        res.cookie('jwt', result, {maxAge: 100*60*60, httpOnly: true});
        res.send(result);
    }).catch(err=>{
        console.log(err);
        res.send(err);
    })
});
module.exports = router;