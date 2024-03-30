import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/homework"
const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(url, {

        })
        console.log("Connected")
    } catch (error) {
        console.log(error);
        console.log("Error");
    }
};

export default dbConnect