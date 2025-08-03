const userAuth = require("../Middleare/Auth");

const express = require('express');
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/userSchema");

const userRouter = express.Router();

userRouter.get("/user/request/received",userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequest=await ConnectionRequest.find({
            toUserId:loggedInUser._id, 
            status:"interested",

        }).populate("fromUserId",["firstName","lastName","age","gender"])

    } catch (error) {
        console.log(error)
    }
});

userRouter.get("/feed",userAuth,async(req,res)=>{
    try {
        const loggedInUser=req.user;
        const page = parseInt (req.query.page)|| 1;
        let limit  = parseInt(req.query.limit)|| 10;
        limit = limit>50? 50:limit;
        const skip = (page-1)*limit;
        const connectionRequest = await ConnectionRequest.find({
            $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}],
        }).select("fromUserId  toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());

        })
        const users = await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUsersFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select("firstName lastName email")
.skip(skip).limit(limit);
        res.json({data:users})
    } catch (error) {
        console.log(error)
    }
})