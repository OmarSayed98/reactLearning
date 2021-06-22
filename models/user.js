const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    userName : String,
    password: String,
    email : String,
    dateOfBirth : Date
});

const user = mongoose.model('user', userSchema);

module.exports = user;