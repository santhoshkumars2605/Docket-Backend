const UserDetails = require('../model/userdetails')
const { OAuth2Client } = require("google-auth-library");
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

exports.googleLogin = async (req, res) => {
    try {
        const credential = req.body;
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: credential.credentials,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        
        console.log(ticket);
        const payload = ticket.getPayload();

        const googleId = payload.sub;
        const name = payload.name;
        const email = payload.email;
        const picture = payload.picture;

        console.log({
            googleId,
            name,
            email,
            picture
        });

        res.status(200).json({
            success: true,
            message: "Google token received"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};