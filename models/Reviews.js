import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviewed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Review = mongoose.model('Review', ReviewSchema);
export default Review