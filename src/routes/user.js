const userAuth = require("../Middleare/Auth");

const express = require('express');
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/userSchema");

const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName age gender photoUrl"
userRouter.get("/user/request/received",userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequest=await ConnectionRequest.find({
            toUserId:loggedInUser._id, 
            status:"interested",

        }).populate("fromUserId", USER_SAFE_DATA)

    } catch (error) {
        console.log(error)
    }
});

userRouter.get('/user/connections', userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id, status: "accepted"},
                {fromUserId:loggedInUser._id, status:"accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA)
          .populate("toUserId", USER_SAFE_DATA)

        const data = ConnectionRequest.applyTimestamps((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId;
        })
        res.json({data})
    } catch (error) {
        console.log(error);
        
    }
})

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