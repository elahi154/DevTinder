const express = require("express");
const {validateSignupData}=require('../utils/validation')
const bcrypt = require('bcrypt')
const authRoute = express.Router();
const User = require('../models/userSchema')

authRoute.post("/signup",async(req,res)=>{
    try {
    validateSignupData(req);

    const {firstName, lastName, email, password} = req.body;

    const passwordHash = await bcrypt.hash (password, 10);
    
    const user = new User({
        firstName,
        lastName,
        email,  
        password:passwordHash,});
    
        await user.save();
        res.send("user created successfully");
        
    } catch (error) {
        res.status(400).send("Error creating user: " + error.message);
    }
    
});
authRoute.post("/login",async(req,res)=>{
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and password are required");
        }
        
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).send("User not found");
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid password");
        }
        const token = await user.getJWT();
        //console.log(token);
        res.cookie("token",token);
        
        res.send(user);

    }catch(error){
        res.status(400).send("Error logging in: " + error.message);
    }
});
authRoute.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    });
    res.send("logout successfully::")
})
module.exports = authRoute;
