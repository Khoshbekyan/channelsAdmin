import { genSalt, hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../schema/userSchema.js";
const jwtKey = "admin"
import getAddress from "./map.js";

const createUser = async (req, res) => {
    const saltRounds = 10;
    const { firstName, lastName, username, email, password, age, address } = req.body;

    const salt = await genSalt(saltRounds);
    const hashPassword = hashSync(`${password}`, salt);

    const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: 0,
            message: "Սխալ էլեկտրնային հասցե 777",
        });
    }

    const userAddress = await getAddress(address);
    const { lat, lng } = userAddress;

    const user = await Users.create({
        name: firstName,
        surname: lastName,
        username,
        email,
        age,
        password: hashPassword,
        address: {
            lat,
            lng,
        },
    });

    console.log(req.body);
    res.json({
        status: 1,
        data: user,
        address: userAddress,
    });
};



const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Users.findOne({ username });

        if (!user) {
            return res.json({
                status: 0,
                message: "User not found"
            });
        }

        const passwordMatch = await compareSync(password, user.password);

        if (!passwordMatch) {
            return res.json({
                status: 0,
                message: "Wrong password"
            });
        }

        const token = jwt.sign({
            id: user.id,
            username: user.username,
            name: user.name
        }, jwtKey, {
            expiresIn: "1h"
        });

        res.json({
            status: 1,
            token
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            status: 0,
            message: "Internal server error"
        });
    }
};




export {
    createUser,
    login,
}