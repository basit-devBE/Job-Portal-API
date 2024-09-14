import express from "express"
import { isLoggedIn } from "../middlewares/isLoggedIn.js"
import { applyJob, createJobs, DeleteJob, fetchJobs, recruiterJobs, updateJob, viewApplicantsforJob } from "../controllers/jobsontrollers.js"

const JobRouter = express.Router()

JobRouter.post("/jobs/create", isLoggedIn,createJobs)
JobRouter.post("/jobs/apply/:id", isLoggedIn,applyJob)
JobRouter.put("/jobs/updatejob/:id", isLoggedIn, updateJob)
JobRouter.delete("/jobs/delete/:id", isLoggedIn,DeleteJob)
JobRouter.get("/jobs/myjobs", isLoggedIn,recruiterJobs)
JobRouter.get("/jobs", fetchJobs)
JobRouter.post("/jobs/viewapplicants/:id" ,isLoggedIn,viewApplicantsforJob)
export default JobRouter