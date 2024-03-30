import ChannelModel from "../schema/channelSchema.js"

const createChannels = async (req,res) => {
const channel = await ChannelModel.create({
    ...req.body,
    user: req.user.id
})
console.log('channel: ', channel);

    res.json({
        status: 1,
        data: channel
    })
}
const getChannels = async (req, res) => {
    try {
        const { page, limit, sort } = req.query;
        const skip = (+page - 1) * +limit;

        const filter = {};

        const count = await ChannelModel.countDocuments(filter);
        const channels = await ChannelModel.find(filter, {}, {
            limit: +(limit),
            sort: {
                createdAt: sort === "desc" ? -1 : 1
            },
            skip: skip
        });

        res.json({
            status: 1,
            data: channels,
            count
        });
    } catch (error) {
        console.error(error);
    }
};

const updateChannel = async (req, res) => {
    try {
        const updateData = req.body; 
        const userId = req.user.id; 
        const channelId = req.params.id
        const channel = await ChannelModel.findOne({
            _id: req.params.id,
            user: userId
        })

        if (!channel) {
            return res.status(403).json({ error: 'chka' });
        }
        const updatedChannel = await ChannelModel.findByIdAndUpdate(channelId, updateData, { new: true });

        res.json({ user: userId, updatedChannel });
    } catch (error) {
        console.error('Error updating channel:', error);
        res.status(500).json({ error: "Error "});
    }
};


const deleteChannel = async (req,res) => {
    const userId = req.user.id; 
        const channelId = req.params.id
        const channel = await ChannelModel.findOne({
            _id: req.params.id,
            user: userId
        })
        const delChannel = await ChannelModel.findByIdAndDelete(channelId, {new: true})
    res.json({
        status: 1,
        message: "Jnjvec"
    })
} 
export {
    createChannels,
    getChannels,
    updateChannel,
    deleteChannel
}

