const mongoose = require('mongoose')
//schema desgin
const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})
module.exports = mongoose.model('userdetails',UserSchema);