import expressAsyncHandler from "express-async-handler";
import User from "../models/Users.js";
import Job from "../models/Job.js";

export const createJobs = expressAsyncHandler(async(req,res,next)=>{
    const userId = req.auth.id
    const user = await User.findById(userId)
    if(!user){
        return res.json({
            status:400,
            message:"User does not exist"
        })
    }
    if(!user.isVerified){
        return res.json({
            status:400,
            message:"User is not verified"
        })
    }
    if(user.role !== "Recruiter"){
        return res.json({
            status:400,
            message:"User is not a recruiter"
        })
    }
    const {name, description,budget,Location} = req.body
    if(!name || !description || !budget ||!Location){
        return res.json({
            status:400,
            message:"Please fill all fields"
        })
    }
    try{
        const job = new Job({
            name,
            description,
            budget,
            Location,
            Recruiter: userId
        })
        await job.save()
        res.json({
            status:200,
            message:"Job created successfully",
            job
        })}catch(error){
            next(error)
        }
})

export const applyJob = expressAsyncHandler(async(req,res,next)=>{
    const UserId = req.auth.id
    const user = await User.findById(UserId);
    if(!user){
        return res.json({
            status: 400,
            msg:"There is no User"
        })
    }
    if(!user.isVerified){
        return res.json({
            status: 400,
            msg:"User is not verified"
        })
    }
    if(user.role !== "Applicant"){
        return res.json({
            status: 400,
            msg:"User cannot apply for job"
        })
    }
    const jobId= req.params.id
    const job = await Job.findById(jobId)
    if(!job){
        return res.json({
            status: 400,
            msg:"Job does not exist"
        })
    }
    if(!job.Availability){
        return res.json({
            status: 400,
            msg:"Job is not available"
        })
    }
    job.Applicants.push(UserId)
    user.Applied_Jobs.push(jobId)
    await job.save()
    res.json({
        status: 200,
        msg:"Job applied successfully"
    })
})

