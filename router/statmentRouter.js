import { Router } from "express";
import { createStatment, getStatment, getStatmentByID, getStatmentByUser,getMyStatment, buyStatement } from "../controllers/statmentController.js";
import { checkAuth } from "../middlewares/validation.js";
const statmentRouter = Router();

statmentRouter.get("", getStatment)
statmentRouter.get("/my",checkAuth, getMyStatment)
statmentRouter.get("/:id", getStatmentByID);
statmentRouter.post("", checkAuth, createStatment)
statmentRouter.post("/buy/:id", checkAuth, buyStatement)

statmentRouter.get("/userCars", checkAuth, getStatmentByUser)

export { statmentRouter }