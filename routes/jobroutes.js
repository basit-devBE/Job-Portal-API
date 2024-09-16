import express from "express"
import { isLoggedIn } from "../middlewares/isLoggedIn.js"
import { applyJob, closeJob, createJobs, DeleteJob,fetchavailableJobs ,recruiterJobs, updateJob, viewApplicantsforJob } from "../controllers/jobsontrollers.js"

const JobRouter = express.Router()

/**
 * @swagger
 * /jobs/create:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     description: Recruiter can create a new job posting.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               requirements:
 *                 type: string
 *               salary:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created successfully.
 *       400:
 *         description: Invalid input data.
 */
JobRouter.post("/jobs/create", isLoggedIn, createJobs);

/**
 * @swagger
 * /jobs/apply/{id}:
 *   post:
 *     summary: Apply for a job
 *     tags: [Jobs]
 *     description: Users can apply for a specific job by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job to apply for
 *     responses:
 *       200:
 *         description: Applied successfully.
 *       404:
 *         description: Job not found.
 */
JobRouter.post("/jobs/apply/:id", isLoggedIn, applyJob);

/**
 * @swagger
 * /jobs/updatejob/{id}:
 *   put:
 *     summary: Update a job post
 *     tags: [Jobs]
 *     description: Update details of an existing job posting.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               requirements:
 *                 type: string
 *               salary:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job updated successfully.
 *       404:
 *         description: Job not found.
 */
JobRouter.put("/jobs/updatejob/:id", isLoggedIn, updateJob);

/**
 * @swagger
 * /jobs/delete/{id}:
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     description: Recruiter can delete a job by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job to delete
 *     responses:
 *       200:
 *         description: Job deleted successfully.
 *       404:
 *         description: Job not found.
 */
JobRouter.delete("/jobs/delete/:id", isLoggedIn, DeleteJob);

/**
 * @swagger
 * /jobs/myjobs:
 *   get:
 *     summary: Get jobs posted by recruiter
 *     tags: [Jobs]
 *     description: Fetch all jobs created by the logged-in recruiter.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of recruiter's jobs.
 */
JobRouter.get("/jobs/myjobs", isLoggedIn, recruiterJobs);

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Fetch all available jobs
 *     tags: [Jobs]
 *     description: Retrieve a list of all available jobs.
 *     responses:
 *       200:
 *         description: List of available jobs.
 */
JobRouter.get("/jobs", fetchavailableJobs);

/**
 * @swagger
 * /jobs/viewapplicants/{id}:
 *   post:
 *     summary: View applicants for a job
 *     tags: [Jobs]
 *     description: Recruiter can view applicants for a specific job by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job to view applicants for
 *     responses:
 *       200:
 *         description: List of applicants.
 *       404:
 *         description: Job not found.
 */
JobRouter.post("/jobs/viewapplicants/:id", isLoggedIn, viewApplicantsforJob);

/**
 * @swagger
 * /jobs/close/{id}:
 *   post:
 *     summary: Close a job posting
 *     tags: [Jobs]
 *     description: Close a job post to stop receiving applications.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the job to close
 *     responses:
 *       200:
 *         description: Job closed successfully.
 *       404:
 *         description: Job not found.
 */
JobRouter.post("/jobs/close/:id", isLoggedIn, closeJob);

export default JobRouter;

