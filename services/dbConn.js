const mongoose = require('mongoose');

const dbConn = mongoose.connect('mongodb://localhost:27017/RECAP',{useNewUrlParser: true , useUnifiedTopology: true }).then(()=>{
    console.log('connected to db')
}).catch(err=>{
    console.log(err);
});

module.exports = dbConn;