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
        validate(value) {
            if (value.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }
        }
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }
    

},{timestamps:true});
const User = mongoose.model("User",userSchema);
module.exports = User;