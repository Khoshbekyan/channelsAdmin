import mongoose from "mongoose";

const UserPackagesSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: "User",
    },
    channelName: String,
    currency: String,
    type: {
        channelId: String,
        daily: {
            type: Number,
            default: 0
        },
        weekly: {
            type: Number,
            default: 0
        },
        monthly: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});


const UserPackageModel = mongoose.model('UserPackage', UserPackagesSchema); // Changed model name to 'UserPackage'

export default UserPackageModel;
