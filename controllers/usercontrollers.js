import expressAsyncHandler from "express-async-handler";
import { hashPassword } from "../utils/password.js";
import User from "../models/Users.js";
import  bcrypt  from 'bcrypt';
import {generateToken} from "../utils/jwToken.js";
import ImgUpload from "../middlewares/multer.js";
import { uploadfiletocloudinary } from "../utils/cloduinary.js";
import  sendMail  from "../config/sendmail.js";
import createVerifyToken from "../utils/verify.js";
import Verification from "../models/verification.js";
import { readFileSync } from 'fs';
import fs from "fs"
import { verify } from "crypto";

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
        const token = await createVerifyToken()
        await Verification.create({
            Token: token,
            userId: user._id
        })
        const verifyLink = `http://localhost:4320/users/verify/${token}/${user.id}`        
        const receivinguser = user.email
        const subject = "Email Verification"
        const email_template = "verifyemail"
        const name = user.username
        const context = {
            name: user.username,
            verifyLink: verifyLink}
        const responsedata = {username : user.username, role:user.role}
        await sendMail(receivinguser, subject, email_template,context)
            if(sendMail){
                user.password = 0;
                res.json({
                    status:201,
                    message:"User created successfully, Check your mail to verify your account",
                    data: responsedata
                })  
            }
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
    const token = generateToken({userId: user._id, role: user.role});

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


export const VerifyAccount = expressAsyncHandler(async(req,res,next)=>{
    const {token,userId} = req.params

    const user = await User.findById(userId)
    if(!user){
        return res.json({
            status:400,
            message:"User does not exist"
        })
    }
    if(user.isVerified){
        return res.json({
            status:400,
            message:"User is already Verified"
        })
    }
    const verification = await Verification.findOne({token:token})
    if(!verification){
        return res.json({
            status: 400,
            message: "Invalid verification Link"
        })
    }
    user.isVerified = true
    await user.save()

    // await sendMail(user.email,"Welcome To Crimson Job",)
    res.json({
        status: 200,
        msg:"User Verified Successfully"
    })

})
export const Updateuser = expressAsyncHandler(async(req,res,next)=>{
    const {username,email,password,About} = req.body
    const user = await User.findById(req.auth.id)
    if(!user){
        return res.json({
            status:400,
            message:"The User you want to update does not exist"
        })
    }
    if(username){
        user.username = username
    }
    if(email){
        user.email = email
    }
    if(password){
        user.password = await hashPassword(password)
    }
    if(About){
        user.About = About
    }
    if(req.file){
        if (req.file) { // Check if a file is uploaded
           
            try{
                const result = await uploadfiletocloudinary(req.file.path);
                user.profilePicture = result.secure_url;
            }catch(error){
                return res.status(500).json({
                    status:500,
                    message:"Failed to upload profile picture",
                    error:error.message
                })
            }
        }
    }    
    await user.save()
    user.password = 0;
    res.json({
        status:200,
        message:"User updated successfully",
        data:user
    })
})

export const fetchallUsers = expressAsyncHandler(async(req,res,next)=>{
    const users = await User.find()
    if(!users){
        return res.json({
            status:400,
            message:"No users found"
        })
    }
    users.password = 0;
    res.json({
        status:200,
        message:"Users fetched successfully",
        data:users
    })
})

export const deleteuser = expressAsyncHandler(async(req,res,next)=>{
    const {uerId}= req.auth.id
    const user = await User.findById(uerId)
    if(!user){
        return res.json({
            status:400,
            message:"User does not exist"
        })
    }
    await user.remove()
    res.json({
        status:200,
        message:"User deleted successfully"
    })
})

export const fetchUserProfile = expressAsyncHandler(async(req,res,next)=>{
    const userId = req.params.id
    const user = await User.findById(userId)
    if(!user){
        return res.json({
            status:400,
            message:"User does not exist"
        })
    }
    user.password = 0;
    return res.json({
        status:200,
        message:"User fetched successfully",
        data:user
    })
})