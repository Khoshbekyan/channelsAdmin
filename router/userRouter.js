import { Router } from "express";
import { createUser, login, } from "../controllers/userCintroller.js";

const userRoutes = Router();

userRoutes.post("/registration", createUser)
userRoutes.post("/login", login)


export {userRoutes}