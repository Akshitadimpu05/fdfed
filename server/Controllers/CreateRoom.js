const dbModel = require("../Models/RoomModel");
const { v4: uuidv4 } = require('uuid');
const userRoomdb = require("../Models/UserApartmentModel");
const UserApartment = require("../Models/ApartmentUserModel");
class RoomModel {
    constructor() {

    }

    async createRoomReq(req, res) {
        try {
            const { name, registration_num, state, address, flat_id, pincode, email, subscription } = req.body;
            const isAlreadyRegistered = await dbModel.findOne({ registration_num: registration_num });
            if (isAlreadyRegistered) {

                return res.status(400).json({ message: "Registration number already in use" });
            }
            const uuid = uuidv4();
            const newuserApartment = new UserApartment({
                user: req.id,
                username: req.userDetails.username + "-" + flat_id,
                flat_id: flat_id,
                apartment_id: uuid,
                user_designation: "Owner"
            })
            await newuserApartment.save();
            const newRoom = new dbModel({
                owner: req.id,
                ownername: req.userDetails.username,
                apartment_name: name,
                address: address,
                apartment_id: uuid,
                state: state,
                pincode: pincode,
                registration_num: registration_num,
                emergency_email: email,
                subscription: subscription,
                resident_id: [newuserApartment._id]
            })
            await newRoom.save();
            const userRooms = await userRoomdb.find({ user: req.id });
            if (userRooms.length > 0) {
                userRooms[0].apartments.push(newRoom._id);
                await userRooms[0].save();

            }
            return res.status(200).json({ message: "Room created successfully", room: newRoom });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });

        }
    }

}

module.exports = RoomModel;