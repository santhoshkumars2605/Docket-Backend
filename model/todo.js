const mongoose = require('mongoose')
//schema design
const Todoschema = new mongoose.Schema({
    title:String,
    isCompleted: Boolean,
    priority: String,
    email:String,
})

module.exports = mongoose.model('todo',Todoschema); //1st is collectionname,2nd is shcemaa

