import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    skillset:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill"
        }
    ],
    budget:{
        type: Number,
        required: true
    },
    // deadline:{
    //     type: Date,
    //     required: true
    // },
    Recruiter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    Applicants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    Location:{
        type: String,
        required: true
    },
    Availability:{
        type: Boolean,
        default: true
    }
//TODO:Successful applicants(array..store their ID)
})

jobSchema.methods.updateAvailability = function () {
    const now = new Date();
    const jobCreationDate = new Date(this.createdAt);
    const oneMonthLater = new Date(jobCreationDate.setMonth(jobCreationDate.getMonth() + 1));

    if (now > oneMonthLater) {
        this.Availability = false;
    }

    return this.save();
};


export {updateAvailability}

const Job = mongoose.model("Job", jobSchema)
export default Job