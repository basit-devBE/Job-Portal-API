import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Applicant', 'Recruiter']
    },
    profilePicture: {
        type: String,
        default: "default.jpg"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    About: {
        type: String,
        default: "No information provided"
    },
    Applied_Jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        }],
    Skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill"
        }],
    Reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }],
    cv:{
        type: String,
        default: ""
    }
})

userSchema.methods.toJSON = function(){
    const user = this.toObject();
    if(user.role === 'Recruiter'){
        delete user.Skills;
        delete user.Bids;
    }else if(user.role === 'Applicants'){
        delete user.current_Jobs
    }
    return user;
}

const User = mongoose.model('User', userSchema);
export default User;
