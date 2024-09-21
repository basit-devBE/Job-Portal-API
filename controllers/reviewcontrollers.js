import expressAsyncHandler from "express-async-handler";
import Review from "../models/Reviews";
import User from '../models/Users';


export const addReview = expressAsyncHandler(async(req,res,next)=>{
    const userId = req?.auth?._id
    const user = await User.findById(userId);
    if(!user){
        res.status(404)
        throw new Error('User not found')
    }
    if(!user.isVerified){
        res.status(400)
        throw new Error('User not verified')
    }
    if(user !== "Recruiter"){
        res.status(400)
        throw new Error('Only recruiters can add reviews')
    }

})
