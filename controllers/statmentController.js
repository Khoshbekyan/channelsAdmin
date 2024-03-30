import UserModel from "../schema/userSchema.js";
import statmentModel from "../schema/statmentSchema.js"
import StatmentModel from "../schema/statmentSchema.js";
import getAddress from "./map.js";

const createStatment = async (req, res) => {
    console.log('token: ', req.user);
    console.log('body: ', req.body);
    const {address} = req.body

    const statmentAddress = await getAddress(address)
    const {lat, lng} = statmentAddress

    const statment = await statmentModel.create({
        ...req.body,
        user: req.user.id,
        address: {
            lat: lat,
            lng: lng
        }
    })

    console.log('statment: ', statment);

    res.json({
        status: 1,
        data: statment
    })
}

const getStatment = async (req, res) => {
    const statment = await StatmentModel.find({}).populate({
        path: "user",
        model: UserModel,
        select: {
            password: false
        }
    });
    res.json({
        status: 1,
        statment
    })
}

const getStatmentByUser = async (req, res) => {
    console.log(req.user);
    const statment = await statmentModel.find({
        user: req.user.id
    }).populate({
        path: "user",
        model: UserModel,
        select: {
            password: false,
            _id: false,
        }
    });
    res.json({
        status: 1,
        data: statment
    })
}
const getStatmentByID = async (req, res) => {
    const statmentID = req.params.id;

    const statment = await statmentModel.findById(statmentID);

    if (!statment) {
        return res.status(404).json({ status: 0, message: "Statment not found" });
    }

    res.json({ status: 1, data: statment });
};

const getMyStatment = async (req, res) => {
    const userId = req.user.id; 
        const statment = await statmentModel.find({ user: userId });

        if (!statment) {
            return res.status(404).json({ status: 0, message: "Statement not found for the authenticated user" });
        }else{
            res.json({ status: 1, data: statment });

        }

};

const buyStatement = async(req,res) => {
    const statmentId = req.params.id
    const statement = await statmentModel.findById(statmentId).populate('user', 'name surname');
    const seller  = await UserModel.findOne({_id: statement.user._id})
    const user = req.user
    const userId = req.user.id; 
    const sellerId = seller._id

    const count = req.body.count
    if(sellerId !== userId){
        if(count <= statement.count && count * statement.price <= user.wallet){
            user.wallet = user.wallet - (count * statement.price)
            statement.wallet = statement.wallet + (count * statement.price)
            statement.count -= req.body.count
            console.log(user)
            user.statement.push(statement._id)
            seller.wallet += count * statement.price
            await seller.save()
            await statement.save()
            await user.save()
            
            res.json({
                status: 1,
                message: "True Eghbayr",
                statement: statement,
                user: user
            })
        }else{
            res.json({
                status: 1,
                message: "False Eghbayr"
            })
        }
    }
 
    
}

export {
    createStatment,
    getStatment,
    getStatmentByUser,
    getStatmentByID,
    getMyStatment,
    buyStatement
}