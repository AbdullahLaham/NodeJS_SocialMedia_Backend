import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
export const getUser = async (req, res) => {
    
    const {id} = req.params;
    // res.status(200).json(id);
    try {
        const user = await UserModel.findById(id);
        if (user) {
            
            const {password, ...otherDetails} = user?._doc;
            res.status(200).json(otherDetails);
        } else {
            res.status(500).json("No such user exists");
        }
    } catch(error) {
        res.status(500).json({message: error?.message});

    }
    
}

