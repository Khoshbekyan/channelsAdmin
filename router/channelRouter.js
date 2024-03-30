import { Router } from "express";
import { createChannels, deleteChannel, getChannels, updateChannel } from "../controllers/channelsController.js";
import { checkAuth } from "../middlewares/validation.js";
const channelRouter = Router();

channelRouter.post("", checkAuth, createChannels)
channelRouter.get("", getChannels)
channelRouter.put("/:id", checkAuth, updateChannel)
channelRouter.delete("/:id", checkAuth, deleteChannel)


export default channelRouter;
    