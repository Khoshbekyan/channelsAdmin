import mongoose from "mongoose";

const Users = new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    statement: [String],
    email: String,
    age: Number,
    password: String,
    package: [String],
    wallet: {
        type: Number,
        default: 10000
    },
    photos: {
        type: [String]
    },
    files: [String],
    address: {
        lat: Number,
        lng: Number
    }
});
const UserModel = mongoose.model('User', Users);

export default UserModel;
