import PostModel from "../Models/PostModel.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import UserModel from "../Models/userModel.js";

// create post
export const createPost = async (req, res) => {
    try {
        const newPost = await new PostModel(req?.body);
        newPost.save();
        res.status(200).json(newPost);

    } catch (error) {
        res.status(500).json({message: error?.message})
    }
}

// get post
export const getPost = async (req, res) => {
    try {
        const {id} = req.params;
        const currentPost = await PostModel.findById(id);
        res.status(200).json(currentPost);
    } catch (error) {
        res.status(500).json({message: error?.message});
    }
}

// update post

export const updatePost = async (req, res) => {
    const {id} = req.params; // postId
    const {userId} = req.body;
        
    try {
        const post = await PostModel.findById(id);
        if (userId == post?.userId) {
            await post.updateOne({ $set: req.body }) // update the post with coming data
            res.status(200).json("Post Updated");
        } else {
            res.status(403).json("Action forbidden");
        }
        // const currentPost = await PostModel.findByIdAndUpdate(id, req.body, {new: true});
    } catch (error) {
        res.status(500).json({message: error?.message});
    }
}
// Delete a post
export const deletePost = async (req, res) => {
    const {id} = req.params;
    const {userId} = req.body;
    const post = await PostModel.findById(id);
    try {

        if (userId == post?.userId) {
            await post.deleteOne();
            res.status(200).json("Post Deleted Successfully");
        } else {
            res.status(403).json("Action forbidden");
        }

    } catch (error) {
        res.status(500).json({message: error?.message})
    }
}

// like and dislike post

export const likePost = async (req, res) => {
    const {id} = req.params; // postId
    const {userId} = req.body;
    try {
        const post = await PostModel.findById(id);
        
        // if (post)
        if (!post?.likes?.includes(userId)) {
            await post.updateOne({$push: {likes: userId}});
            console.log(post, 'dddddd')
            const updatedpost = await PostModel.findById(id);
            res.status(200).json(updatedpost)
        } else {
            await post.updateOne({$pull: {likes: userId}});
            const updatedpost = await PostModel.findById(id);
            res.status(200).json(updatedpost)
        }
    } catch (error) {
        res.status(500).json({message: error?.message})
    }
}




// Get Timeline Posts
 export const getTimeLinePosts = async (req, res) => {
    const {id} = req.params; // userId
    try {
        const currentUserPosts = await PostModel.find({userId: id});
        const followingPosts = await UserModel.aggregate([
                {$match: {
                    _id: new mongoose.Types.ObjectId(id), // that give us a single document and that document will contain our user_id and itts id field
                },},
                {$lookup: {
                    from: "posts",
                    localField: "followings",
                    foreignField: "userId",
                    as: "followingPosts",
                },},

                {
                    $project: { /// which fields do you want to return as a result of the aggregation
                        followingPosts: 1,
                        _id: 0,
                    }
                }
                

        ]);
        const allPosts = [...currentUserPosts, ...followingPosts]
        res.status(200).json(currentUserPosts.concat(...followingPosts[0]['followingPosts']).sort((a,b) => b?.createdAt - a?.createdAt));
        // sort it in a descending order
        // we can use 
        //  followingPosts.followings.map((user) => {
        //     console.log(user)
        //  })

    } catch (error) {
        res.status(500).json({message: error?.message})
    }
 }






