import { Router } from "express";
import { createCar, getCarByUser, getCars,getCarByID } from "../controllers/carController.js";
import { checkAuth } from "../middlewares/validation.js";
const carRouter = Router();

carRouter.get("", getCars)
carRouter.get("/:id", getCarByID);
carRouter.post("", checkAuth, createCar)

carRouter.get("/userCars", checkAuth, getCarByUser)

export { carRouter }