import expressAsyncHandler from "express-async-handler";
import { hashPassword } from "../utils/password.js";
import User from "../models/Users.js";
import  bcrypt  from 'bcrypt';
import generateToken from "../utils/jwToken.js";

export const registerUser = expressAsyncHandler(async(req,res,next)=>{
  const {username, email,password,role} = req.body;
  if(!username || !email || !password || !role){
    res.json({
        status:400,
        message:"Please fill all fields"
    })
}
   const validemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!validemail.test(email)){
         res.json({
              status:400,
              message:"Please enter a valid email"
         })
    } 
    const validpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!validpassword.test(password)){
         res.json({
              status:400,
              message:"Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
         })
    }
    const Userexists = await User.findOne({email})
    if(Userexists){
        res.json({
            status:400,
            message:"User already exists"
        })
    }
    const hashedpassword = await hashPassword(password);
    try{
        const user = await User.create({
            username,
            email,
            password:hashedpassword,
            role
        })
        user.password = 0;
        res.json({
            status:201,
            message:"User created successfully",
            data:user,
        })
    }catch(error){
        next(error)
    }

})

export const LoginUser = expressAsyncHandler(async(req,res,next)=>{
   try{
    const {email,password} = req.body
    if(!email || !password){
        res.json({
            status:400,
            message:"Please fill all fields"
        })
    }
    const user = await User.findOne({email})
    if(!user){
        res.json({
            status:400,
            message:"User does not exist"
        })
    }
    const correctPassword = await bcrypt.compare(password, user.password)
    if(!correctPassword){
        res.json({
            status:400,
            message:"Invalid password"
        });
    }
    const token = generateToken({userId: user._id, roles: user.role});

    res.cookie('token',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV,
        sameSite: "none",
        expires: new Date(Date.now() + 3600000)
    })
    res.json({
        status:200,
        message:"User logged in successfully",
        token
    })

   }catch(error){
         next(error)
   }
})