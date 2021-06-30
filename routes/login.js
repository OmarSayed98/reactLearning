const express = require('express');
const router = express.Router();
const user = require('../models/user');
const {authenticateUser} = require('../services/userAuth');
router.get('/',(req,res)=>{
    res.render('login');
});

router.post('/',(req,res)=>{
    authenticateUser(req).then(result=>{
        res.send("welcome "+result.userName);
    }).catch(err=>{
        console.log(err);
        res.send(err);
    })
});
module.exports = router;