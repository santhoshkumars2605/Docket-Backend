const mongoose = require('mongoose');

exports.connectDb = async ()=>{
    try {
        const conn = await mongoose.connect('mongodb+srv://santhoshkumars2605:Jgpc5I76A6UxRfhK@cluster0.dzau7d3.mongodb.net/todo')
        console.log('db connected')
    }catch(err){
        console.log('error in db connection')
        console.log(err)
    }
}