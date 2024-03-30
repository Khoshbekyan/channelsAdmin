import mongoose from "mongoose";

const Channel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    package: {
        daily: Number,
        weekly: Number,
        monthly: Number,

    },

    currency: String,
    user: {
        type: mongoose.ObjectId,
        ref: "Channel",
    },
    photos: {
        type: [String]
    },
}, {
    timestamps: true
});
const ChannelModel = mongoose.model('channel', Channel);

export default ChannelModel;
