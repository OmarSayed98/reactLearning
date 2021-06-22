const express = require('express');
const router = express.Router();
const user = require('../models/user');
const {authenticateUser} = require('../services/userAuth');
router.get('/',(req,res)=>{
    res.render('login');
});

router.post('/',(req,res)=>{
    console.log(req.body.userName);
    res.sendStatus(200);
});
module.exports = router;