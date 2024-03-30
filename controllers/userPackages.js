import UserPackageModel from "../schema/userPackages.js";
import UserModel from "../schema/userSchema.js";

const createUserPackage = async (req, res) => {
        const user = req.user.id
        const { channelId, channelName, currency, cost, type } = req.body;

        const userPackage = await UserPackageModel.create({
            user,
            channelName,
            currency,
            cost,
            type
        });

        res.json({
            status: 1,
            data: userPackage
        });
}
const getUserPackages = async (req,res) => {
    const userPackages = await UserPackageModel.find();

        res.json({
            status: 1,
            data: userPackages
        });
}
const buyChannelPackage = async (req, res) => {
    try {
        const packageId = req.params.id;
        const userId = req.user.id;
        const userPackage = await UserPackageModel.findById(packageId).populate('user', 'name surname');
        const seller  = await UserModel.findOne({_id: userPackage.user._id})


        if (!userPackage) {
            return res.status(404).json({ 
                error: "User package not found" 
            });
        }

        
        res.json({
            status: "Buy Package",
            package: userPackage
        });
    } catch (error) {
        console.error("Error buying channel package:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export {
    createUserPackage,
    getUserPackages,
    buyChannelPackage
}
