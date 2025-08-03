const userAuth = require("../Middleare/Auth");

const express = require('express');
const ConnectionRequest = require("../models/connectionRequest");

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
        if(!ConnectionRequest){
            return res.status(404).json({messsage:"Connection Request not found"});
        }
        connectionRequest.status=status;
        const data = await ConnectionRequest.save();
        res.json({message:"Connection request"+status,data})
        
    } catch (error) {
        res.status(400).send("Error in review request: " + error.message);
    }
 })
module.exports = requestRouter;