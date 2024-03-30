import mongoose from "mongoose";

const Statment = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    count: {type: Number, required: true},
    date: Date,
    user: {
        type: mongoose.ObjectId,
        ref: "User",
    },
    address: {
        lat: Number,
        lng: Number
    }
}, {
    timestamps: true
});
const StatmentModel = mongoose.model('statment', Statment);

export default StatmentModel;
