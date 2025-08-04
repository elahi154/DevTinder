const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxlength:20,
        minlength:2, 
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
            if(!validator.isEmail(value)){
                throw new Error("Invalid email")
            }
        }
        
    },

    password:{
        type:String,
        required:true,
        minlength:6,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter strong password")
            }
        }
    },
    age:{
        type:Number,
        min:16,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Enter data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://tse3.mm.bing.net/th/id/OIP.w0TcjC4y9CxTrY3sitYa_AAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Invalid Image url")
            }
        }
    },
    about:{
        type:String,
        default:"this is a default description"
    },

    skills:{
        type:[String],
    },
    

},{timestamps:true});

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"7d"});
    return token;
}
const User = mongoose.model("User",userSchema);
module.exports = User;