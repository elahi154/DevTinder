const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true  ,
        maxlength:20,
        minlength:2,   
        validate(value) {
            if (value.length < 2 || value.length > 20) {
                throw new Error('Last name must be between 2 and 20 characters long');
            }
        }


    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                throw new Error('Invalid email format');
            }
        }
        
    },

    password:{
        type:String,
        required:true,
        minlength:6,
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    about:{
        type:String
    },
    

},{timestamps:true});

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"7d"});
    return token;
}
const User = mongoose.model("User",userSchema);
module.exports = User;