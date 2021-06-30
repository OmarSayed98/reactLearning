const mongoose = require('mongoose');
const {Schema} = mongoose;
const saltRounds = 10;
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    userName : String,
    password: String,
    email : String,
    dateOfBirth : Number
});
userSchema.pre('save', async function(next){
    let user = this;
    user.password = await bcrypt.hash(user.password, 8);
    next();
});
const user = mongoose.model('user', userSchema);
module.exports = user;