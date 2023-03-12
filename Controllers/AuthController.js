import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
// Regestration Form

export const signup = async (req, res) => {
    console.log('he;pppppppppppppp')
    const {username, password, firstname, lastname} = req.body;
    

    const salt = await bcrypt.genSalt(10); // the amount of how much we want to alter the password by hashing
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new UserModel({username, password: hashedPass, firstname, lastname, });
    try {
        
        await newUser.save();
        res.status(200).json(newUser);
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
            validity ? res.status(200).json(user) : res.status(400).json({message: "Wrong Password"});

        } else {
            res.status(404).json({message: 'there is no user with this email'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}