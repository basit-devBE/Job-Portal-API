import cron from "node-cron"
import Job from "../models/Job.js"


cron.schedule('0 0 * * *', async () => {
    console.log("Running job availability update....")
    try{
        const jobs = await Job.find()
        jobs.forEach(async job => {
            await job.updateAvailability()
        })
        console.log("Job availability updated successfully")
    }catch(error){
        console.log("Error updating job availability")
    }
})