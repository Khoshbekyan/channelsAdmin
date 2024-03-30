import { Router } from "express";
import {buyChannelPackage, createUserPackage, getUserPackages} from "../controllers/userPackages.js";
import { checkAuth } from "../middlewares/validation.js";
const userPackage = Router();

userPackage.post("/:id", checkAuth, createUserPackage)
userPackage.post("/buy/:id", checkAuth, buyChannelPackage)



export default userPackage;
    