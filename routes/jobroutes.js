import express from "express"
import { isLoggedIn } from "../middlewares/isLoggedIn.js"
import { applyJob, closeJob, createJobs, DeleteJob,fetchavailableJobs ,recruiterJobs, searchJobs, updateJob, viewApplicantsforJob } from "../controllers/jobsontrollers.js"
const JobRouter = express.Router()
JobRouter.post("/jobs/create", isLoggedIn, createJobs);

JobRouter.post("/jobs/apply/:id", isLoggedIn, applyJob);
JobRouter.put("/jobs/updatejob/:id", isLoggedIn, updateJob);
JobRouter.delete("/jobs/delete/:id", isLoggedIn, DeleteJob);

JobRouter.get("/jobs/myjobs", isLoggedIn, recruiterJobs);

JobRouter.get("/jobs", fetchavailableJobs);

JobRouter.post("/jobs/viewapplicants/:id", isLoggedIn, viewApplicantsforJob);

JobRouter.post("/jobs/close/:id", isLoggedIn, closeJob);
//search for jbs through queries
JobRouter.get("/jobs/search", isLoggedIn, searchJobs)


export default JobRouter;

