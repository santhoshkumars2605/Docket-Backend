const mongoose = require('mongoose');

exports.connectDb = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('db connected')
    }catch(err){
        console.log('error in db connection')
        console.log(err)
    }
}