const express = require('express')
const userAuth = require('../Middleare/Auth');
const { validateEditProfileData } = require('../utils/validation');
const bcrypt = require('bcrypt')

const profileRouter = express.Router();

profileRouter.get('/profile/view',userAuth, async(req,res)=>{
    try {
        const user = req.user;
    res.send(user);
    }catch(error){
        res.status(400).send("Error logging in: " + error.message);
    }
    
})
profileRouter.patch('/profile/edit',userAuth,async(req,res)=>{
    try {
        if(!validateEditProfileData){
            throw new Error("Invalid Edit request")
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
        await loggedInUser.save();
        res.json({message:`${loggedInUser.firstName} your profile update sucessfully`,data:loggedInUser}) 
    } catch (error) {
         res.status(400).send("Error in update : " + error.message);
    }
})
profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    try {
        const loggedInUser=req.user;
    const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword){
        throw new Error('Both fields are required')
    }
    const isValidPassword = await bcrypt.compare(oldPassword, loggedInUser.password);
    if(!isValidPassword){
        throw new Error('Invalid oldPassword');
    }
    const newPasswordHash = await bcrypt.hash(newPassword,10);
    loggedInUser.password=newPasswordHash;
    await loggedInUser.save();
    res.json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(400).send("Error in passwordUpadate : " + error.message);
    }


})
module.exports=profileRouter;