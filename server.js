import express, { json } from "express";
import bodyParser from "body-parser";;
import { userRoutes } from "./router/userRouter.js";
import dbConnect from  "./db.connect/dbConnect.js";
import { carRouter } from "./router/carRouter.js";
import  uploadFile  from "./router/upload.Files.js";
import {statmentRouter} from "./router/statmentRouter.js"
import channelRouter from "./router/channelRouter.js";
import userPackage from "./router/userPackagesRouter.js";

const app = express()
dbConnect()

app.use(bodyParser.json());
app.use(json());
app.use(express.static('./uploads'))
app.use(express.urlencoded({ extended: true }));
app.use("/", userRoutes)
app.use("/cars", carRouter)
app.use('/user', uploadFile)
app.use('/statment', statmentRouter)
app.use('/channel', channelRouter)
app.use('/userPackage', userPackage)

app.listen(7000)
console.log("PORT ", 7000);