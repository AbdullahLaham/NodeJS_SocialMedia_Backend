import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
export const getUser = async (req, res) => {
    
    const {id} = req.params;
    console.log(id)
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

// update a user
export const updateUser = async (req, res) => {
    const {id} = req.params; // the id of the user that should be updated in the response
    const {_id, currentUserAdminStatus, password} = req.body;

    if (id == _id) {
        try {
            // hashing the password before updating it
            if (password) {
                const salt = await bcrypt.genSalt(10); // the amount of how much we want to alter the password by hashing
                req.body.password = await bcrypt.hash(password, salt);
            }
            const user = await UserModel.findByIdAndUpdate(id, req?.body, {new: true});
            const token = await jwt.sign({
                username: user?.username,
                id: user?._id,
            }, "secret_key", {expiresIn: '1h',});
            res.status(200).json({...user?._doc, token});
        } catch (error) {

            res.status(500).json({message: error?.message});
        }
    } else {
        res.status(500).json('Access Denied! you can only update your own profile');
    }
}


// Delete User

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {currentUserId, currentUserAdminStatus} = req.body;
        if (id === currentUserId || currentUserAdminStatus) {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("User Deleted Successfully");
        } else {
            res.status(403).json("Access Denied! you can only update your own profile")
        }
    } catch (error) {
        res.status(500).json("Access Denied! you can only update your own profile")
    }
}


// Follow a User

export const followUser = async (req, res) => {
    const { id } = req.params;
    const {userId: currentUserId} = req.body;
    if (currentUserId === id) {
        res.status(403).json("Action forbidden");
    } else {
        try {
            let followerUser = await UserModel.findById(currentUserId);
            let followedUser = await UserModel.findById(id);

            if (!followedUser?.followers?.includes(currentUserId)) {
                await followedUser.updateOne({$push: {followers: currentUserId}});
                await followerUser.updateOne({$push: {followings: id}});
                // let newFollowerUser = {...followerUser?._doc, followings: [...followerUser?._doc?.followings, {...followedUser?._doc, password: ''}]};
                // let newFollowedUser = {...followedUser?._doc, followers: [...followedUser?._doc?.followers, {...followerUser?._doc, password: ''}]};
                // console.log(newFollowerUser, newFollowedUser)
                res.status(200).json("user followed successfully");
            } else {
                res.status(403).json("User is Already followed by you")
            }
            
            
        } catch (error) {
            res.status(500).json({message: error?.message});
        }
    }
}



// UnFollow a User

export const unFollowUser = async (req, res) => {
    const { id } = req.params;
    const {userId: currentUserId} = req.body;
    if (currentUserId === id) {
        res.status(403).json("Action forbidden");
    } else {
        try {
            let followerUser = await UserModel.findById(currentUserId);
            let followedUser = await UserModel.findById(id);

            if (followedUser?.followers?.includes(currentUserId)) {
                await followedUser.updateOne({$pull: {followers: currentUserId}});
                await followerUser.updateOne({$pull: {followings: id}});
                // let newFollowerUser = {...followerUser?._doc, followings: [...followerUser?._doc?.followings, {...followedUser?._doc, password: ''}]};
                // let newFollowedUser = {...followedUser?._doc, followers: [...followedUser?._doc?.followers, {...followerUser?._doc, password: ''}]};
                // console.log(newFollowerUser, newFollowedUser)
                res.status(200).json("user unfollowed successfully");
            } else {
                res.status(403).json("User is Not followed yet");
            }
            
            
        } catch (error) {
            res.status(500).json({message: error?.message});
        }
    }
}



// getAllUsers 
export const getAllUsers = async (req, res) => {
    // return all users in on array
    try {
        const allUsers = await UserModel.find();
        let users = allUsers.map((user) => {
            const {password, ...otherDetails} = user?._doc;
            return otherDetails;
        });
        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error?.message});
    }
}




