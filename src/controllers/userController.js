const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const user = require("../model/user");
const SECRET_KEY = process.env.SECRET_KEY;


const signup = async (req,res) =>  {
    const {username , email , password} = req.body;
    try {
        const existinguser = await userModel.findOne({email :email});
        if(existinguser){
            return res.status(400).json({messege: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await userModel.create ({
            email : email,
            password : password,
            username : username
        });
        
        const token = jwt.sign({email:result.email, id:result._id}, SECRET_KEY);
        res.status(200).json({user:result,token:token})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({messege: "Something went wrong"});
    }
    
}
const signin = async (req,res)=>{

    const {email,password} = req.body;
    try {
        const existinguser = await userModel.findOne({email :email});
        if(!existinguser){
            return res.status(404).json({messege: "User not found"});
        }

        const matchPassword = await bcrypt.compare(password, existinguser.password);

        if(!matchPassword){
          return  res.status(400).json({messege: "Invalid credantials"});
        }

        const token = jwt.sign({email:existinguser.email, id:existinguser._id}, SECRET_KEY);
        return res.status(200).json({user:existinguser,token:token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({messege: "Something went wrong"});
    }

}

module.exports = {signup,signin};