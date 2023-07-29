import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";

// Regestration Form

export const signup = async (req, res) => {
    console.log('he;pppppppppppppp')
    // const {username, password, firstname, lastname} = req.body;
    

    
   
    try {
        const salt = await bcrypt.genSalt(10); // the amount of how much we want to alter the password by hashing
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPass;
        const {username} = req.body;

        const newUser = new UserModel(req?.body);


        const oldUser = await UserModel.findOne({ username });

        if (!oldUser) {
            const user = await newUser.save();
            const token = jwt.sign({
                username: user?.username, id: user?._id,
            }, "secret_key", {expiresIn: '1h',})
            res.status(200).json({...user?._doc, token});
        } else {
            return res.status(400).json({message: "username is already registered"});
        }

        
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

// login User

export const loginUser = async (req,res) => {
    const {username, password} = req.body;

    try {
        const user = await UserModel.findOne({username});
        if (user?.username) {
            const validity = await bcrypt.compare(password, user?.password);
            const token = jwt.sign({
                username: user?.username, id: user?._id, 
            }, "secret_key", {expiresIn: '1h',})
            validity ? res.status(200).json({...user?._doc, token}) : res.status(400).json({message: "Wrong Password"});

        } else {
            res.status(404).json({message: 'there is no user with this email'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}




// logout User

export const logoutUser = async (req,res) => {
    const {userId} = req.body;

    try {
        const user = await UserModel.findOne({username});
        if (user?.username) {
            const validity = await bcrypt.compare(password, user?.password);
            const token = jwt({
                username: user?.username, id: user?._id, 
            }, "secret_key", {expiresIn: '1h',})
            validity ? res.status(200).json({...user?._doc, token}) : res.status(400).json({message: "Wrong Password"});

        } else {
            res.status(404).json({message: 'there is no user with this email'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


