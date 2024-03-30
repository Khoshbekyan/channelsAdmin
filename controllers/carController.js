import UserModel from "../schema/userSchema.js"
import CarsModel from "../schema/carSchema.js"

const createCar = async (req, res) => {
    console.log('token: ', req.user);
    console.log('body: ', req.body);

    const car = await CarsModel.create({
        ...req.body,
        user: req.user.id
    })

    console.log('car: ', car);

    res.json({
        status: 1,
        data: car
    })
}
const getCars = async (req, res) => {

    const cars = await CarsModel.find({}).populate({
        path: "user",
        model: UserModel,
        select: {
            password: false
        }
    });
    res.json({
        status: 1,
        cars
    })
}

const getCarByUser = async (req, res) => {
    console.log(req.user);
    const cars = await CarsModel.find({
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
        data: cars
    })
}
const getCarByID = async (req, res) => {
    const carId = req.params.id;

    const car = await CarsModel.findById(carId);

    if (!car) {
        return res.status(404).json({ status: 0, message: "Car not found" });
    }

    res.json({ status: 1, data: car });
};

export {
    getCars,
    createCar,
    getCarByUser,
    getCarByID
}