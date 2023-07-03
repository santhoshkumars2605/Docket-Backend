const UserDetails = require('../model/userdetails')
const bcrypt = require('bcrypt')

exports.Register = async (req,res)=>{
    try{
        // console.log(req.params.email)
        const check = await UserDetails.findOne({email:req.body.email})
        if(!check)
        {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            console.log(hashedPassword)
            const user = await new UserDetails({
                name:req.body.name,
                email:req.body.email,
                password:hashedPassword
            })
            await user.save()
            res.json({status:true,msg:"User registerd successfully"})
        }
        else{
            res.json({status:false,msg:"User Already Exist"})
        }
    }
    catch(err){
        console.log(err)
        res.json({status:false,msg:err})
    }
}
exports.Login = async (req,res)=>{
    try{
        const check = await UserDetails.findOne({email:req.body.email})
        if(check){
            const isPasswordValid = await bcrypt.compare(req.body.password, check.password);
            if(isPasswordValid){
                res.json({status:true,msg:"exists"})
            }
            else{
                res.json({status:false,msg:"Password Incorrect"})
            }
        }
        else{
            res.json({status:false,msg:"You have to Register"})
        }
    }
    catch(err){
        res.json({status:false,msg:err})
    }
}
