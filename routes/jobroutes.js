import express from "express"
import { isLoggedIn } from "../middlewares/isLoggedIn.js"
import { createJobs } from "../controllers/jobsontrollers.js"

const JobRouter = express.Router()

JobRouter.post("/jobs/create", isLoggedIn,createJobs)

export default JobRouter