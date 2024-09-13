import express from "express"
import { isLoggedIn } from "../middlewares/isLoggedIn.js"
import { applyJob, createJobs } from "../controllers/jobsontrollers.js"

const JobRouter = express.Router()

JobRouter.post("/jobs/create", isLoggedIn,createJobs)
JobRouter.post("/jobs/apply/:id", isLoggedIn,applyJob)

export default JobRouter