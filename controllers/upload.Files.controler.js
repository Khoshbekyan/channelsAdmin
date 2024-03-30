import ChannelModel from "../schema/channelSchema.js";
import Users from "../schema/userSchema.js";

const uploadFile = async (req, res) => {
    const ext = req.file.mimetype.split("/")[0];
    const updateField = ext === "image" ? "photos" : "files";
    
    const newUser = await ChannelModel.findByIdAndUpdate(
        req.user.id,
        { $push: { [updateField]: req.file.path } },
        { new: true }
    );

    res.json({
        status: 1,
        data: newUser
    }); 
};

export { uploadFile };
