const jwt = require('jsonwebtoken');
const User =require('../models/userSchema')
const userAuth = async(req,res,next)=>{
    try {
        const{token} = req.cookies;
        if(!token){
        return res.status(401).send("Please login to continue");
        }
        const decodedObj = await jwt.verify(token,process.env.JWT_SECRET);
        const{_id}=decodedObj;
        const user = await User.findById(_id);
        if(!user){
            throw new Error('Invalid user');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("Error logging in: " + error.message);
    }
}


module.exports = userAuth;