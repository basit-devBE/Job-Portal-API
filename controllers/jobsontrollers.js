import expressAsyncHandler from "express-async-handler";
import User from "../models/Users.js";
import Job from "../models/Job.js";
import sendMail from "../config/sendmail.js";

export const createJobs = expressAsyncHandler(async(req,res,next)=>{
    const userId = req?.auth?._id
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
    const UserId = req?.auth?._id
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

    await user.save()
    await job.save()
    const context = {
        applicantName: user.name,
        applicantEmail: user.email,
        applicationDate: Date.now

    }
    const informemail = "informemail"
    await sendMail(user.email,"Job Application", informemail,context)
    res.json({
        status: 200,
        msg:"Job applied successfully"
    })
})


export const updateJob = expressAsyncHandler(async(req,res,next)=>{
    const userId = req?.auth?._id
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
    const jobId = req.params.id
    const job = await Job.findById(jobId)
    if(!job){
        return res.json({
            status:400,
            message:"Job does not exist"
        })
    }
    if(job.Recruiter.toString() !== userId){
        return res.json({
            status:400,
            message:"You are not authorized to update this job"
        })
    }
    const {name, description,budget,Location} = req.body
    
   if(name){
    job.name = name
   }
   if(description){
    job.description = description
   }
   if(budget){
    job.budget = budget}
    if(Location){
    job.Location = Location}

    await job.save()
    res.json({
        status:200,
        message:"Job updated successfully",
        job
    })
})

export const DeleteJob = expressAsyncHandler(async(req,res,next)=>{
    const userId = req?.auth?._id
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
    const jobId = req.params.id
    const job = await Job.findById(jobId)
    if(!job){
        return res.json({
            status:400,
            message:"Job does not exist"
        })
    }
    if(job.Recruiter.toString() !== userId){
        return res.json({
            status:400,
            message:"You are not authorized to delete this job"
        })
    }

    await job.deleteOne()
    res.json({
        status:200,
        message:"Job deleted successfully"
    })
})

//view all posted jobs
export const fetchavailableJobs = expressAsyncHandler(async(req,res,next)=>{
    try{
        // if(Job.A)
        // const jobs = await Job.find({"Job.Availability":true})
        const jobs = await Job.find({Availability:true})
        
        if(!jobs){
            return res.json({
                status:400,
                message:"No jobs found"
            })
    }
    res.json({
        status:200,
        message:"Available Jobs fetched successfully",
        data:jobs
    })}catch(error){
        next(error)
    }
})


export const recruiterJobs = expressAsyncHandler(async(req,res,next)=>{
    const userId = req?.auth?._id
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
    const jobs = await Job.find({Recruiter:userId})
    if(!jobs){
        return res.json({
            status:400,
            message:"No jobs found"
        })
    }
    res.json({
        status:200,
        message:"Jobs fetched successfully",
        data:jobs
    })
})

export const viewApplicantsforJob = expressAsyncHandler(async(req,res,next)=>{
    const userId = req?.auth?._id
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
    const jobId = req.params.id
    const job = await Job.findById(jobId)
    if(!job){
        return res.json({
            status:400,
            message:"Job does not exist"
        })
    }
    if(job.Recruiter.toString() !== userId){
        return res.json({
            status:400,
            message:"You are not authorized to view applicants for this job"
        })
    }
    const applicants = job.Applicants
    if(!applicants){
        return res.json({
            status:400,
            message:"No applicants found"
        })
    }
    res.json({
        status:200,
        message:"Applicants fetched successfully",
        data:applicants
    })
})

export const closeJob = expressAsyncHandler(async(req,res,next)=>{
    const userId = req?.auth?._id
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
    const jobId = req.params.id
    const job = await Job.findById(jobId)
    if(!job){
        return res.json({
            status:400,
            message:"Job does not exist"
        })
    }
    if(job.Recruiter.toString() !== userId){
        return res.json({
            status:400,
            message:"You are not authorized to close this job"
        })
    }
    job.Availability = false
    await job.save()
    res.json({
        status:200,
        message:"Job closed successfully"
    })
})

//filter job searches
export const searchJobs = expressAsyncHandler(async (req, res, next) => {
    const userId = req?.auth?._id;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(400).json({
            message: "User does not exist",
        });
    }

    if (!user.isVerified) {
        return res.status(400).json({
            message: "User is not verified",
        });
    }

    if (user.role !== "Applicant") {
        return res.status(400).json({
            message: "User is not an applicant",
        });
    }

    const query = {};
    const { name, budget, location } = req.query;

    if (name) {
        query.name = { $regex: name, $options: "i" };
    }

    if (budget) {
        query.budget = { $gte: budget };
    }

    if (location) {
        query.location = { $regex: Location, $options: "i" }; // Ensure 'location' matches Job schema field
    }

    if (Object.keys(query).length === 0) {
        return res.status(400).json({
            message: "Please enter a search parameter",
        });
    }

    const jobs = await Job.find({ Availability: true, ...query });

    if (jobs.length === 0) {
        return res.status(400).json({
            message: "No jobs found",
        });
    }

    res.status(200).json({
        message: "Jobs fetched successfully",
        data: jobs,
    });
});
