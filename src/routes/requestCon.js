const userAuth = require("../Middleare/Auth");

const express = require('express');
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/userSchema");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    try {
        const user = req.user;
        console.log("sending the connection request");
        res.send(user.firstName + " send the connection request");
    } catch (error) {
        res.status(400).send("Error logging in: " + error.message);
    }
})

 requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try {

        const fromUserId = req.user;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatus = ['ignore','interested'];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status type "})
        }
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({message:'Invalid Id'})
        }
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId},
                ]
        }) 
        if(existingConnectionRequest){
            return res.status(400).json({message:'Connection request already exist'})
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })
        const data = await connectionRequest.save();
        res.json({message:'connection request send successfully',data})
        
    } catch (error) {
        res.status(400).send("Error in sending request: " + error.message);
    }
 })

 requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const {status,requestId} = req.params;
        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"status not allowed"})
        }
        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested",
        })
        if(!connectionRequest){
            return res.status(404).json({messsage:"Connection Request not found"});
        }
        connectionRequest.status=status;
        const data = await connectionRequest.save();
        res.json({message:"Connection request"+status,data})
        
    } catch (error) {
        res.status(400).send("Error in review request: " + error.message);
    }
 })
module.exports = requestRouter;