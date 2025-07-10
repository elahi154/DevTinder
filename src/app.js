const express=require('express');
const {auth,user} = require('./Middleare/Auth');
const connectDB  = require('./config/databse');
const User = require('./models/userSchema');
const { validateSignupData } = require('./utils/validation');
const bcrypt = require('bcrypt'); // Assuming you have a bcrypt utility for hashing passwords
const cookieParser = require('cookie-parser');
const Jwt = require('jsonwebtoken');
const userAuth = require('./Middleare/Auth');



const app=express();
app.use(express.json());
app.use(cookieParser()); // Middleware to parse JSON bodies

//app.use("/admin",auth);


app.post("/signup",async(req,res)=>{
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

app.post("/login",async(req,res)=>{
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
        const token = await Jwt.sign({_id:user._id}, "DEV@Tinder$790");
        //console.log(token);
        res.cookie("token",token);
        
        res.send("Login successful");

    }catch(error){
        res.status(400).send("Error logging in: " + error.message);
    }
});

app.get('/profile',userAuth, async(req,res)=>{
    try {
        const user = req.user;
    res.send(user);
    }catch(error){
        res.status(400).send("Error logging in: " + error.message);
    }
    
})







// app.get("/user", async(req,res)=>{
//     const userEmail = req.body.email;
//     try {
//         const user = await User.find({email:userEmail});
//         if(user.length===0){
//             return res.status(404).send("User not found");
//         }
//         else{
//             res.send(user);
//         }
//     } catch (error) {
//         res.status(400).send("Error fetching user: " + error.message);
        
//     }
// })
// app.get("/feed",async(req,res)=>{
//     try {
//         const user = await User.find({});
//         res.send(user)
        
//     } catch (error) {
//         res.status(400).send("Error fetching feed: " + error.message);
        
//     }
// });
// app.delete("/user", async(req,res)=>{
//     const userId = req.body.userId;
//     try{
//         const user = await User.findByIdAndDelete(userId);
//         //res.send("user deleted successfully");
//         if(!user){
//             return res.status(404).send("user not found");
//         }
//         else{
//             res.send("user deleted successfully");
//         }
//     }catch(error){
//         res.status(400).send("Error deleting user: " + error.message);
//     }
// })

// app.patch("/user/:userId",async(req,res)=>{
//     const userId =req.params?.userId;
//     const data = req.body;
//     try {
//         const allowedUpdates = ['firstName', 'lastName', , 'password', 'age'];
//         const updates = Object.keys(data);
//         const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
//         if (!isValidOperation) {
//             return res.status(400).send("Invalid updates");
//         }
//         if (updates.length === 0) {
//             return res.status(400).send("No updates provided");
//         }
//         if (data.email) {
//             return res.status(400).send("Email cannot be updated");
//         }
//         if (data.password && data.password.length < 6) {
//             return res.status(400).send("Password must be at least 6 characters long");
//         }
    
//         const user = await User.findByIdAndUpdate(userId, data );
//         if(!user){
//             return res.status(404).send("User not found");
//         }
//         res.send("User updated successfully");
//     } catch (error) {
//         res.status(400).send("Error updating user: " + error.message);
        
//     }
// })






// app.get("/admin/getAllData",(req,res)=>{
//    res.send("send all the data ");
// });
// app.get("/admin/deleteAllData",(req,res)=>{
//    res.send("delete all the data from data baase ")
// })
// // app.get("/user",user ,(req,res)=>{
// //     res.send("hey this is user data ");
// // })
// app.get("/user/login-page",(req,res)=>{
//     res.send("this is login oage ");
// })

// app.use("/user",(req,res,next)=>{
//     console.log("middleware 0");
    
//     //res.send("hey this is response 1!!!!");
//     next();
// },(req,res,next)=>{
//     console.log("middleware 1");
//     next();
// },(req,res,next)=>{
//     console.log("middleware 2");
//     res.send("hey this is response 3!!!!")
// })


// app.get("user/:useId",(req,res)=>{
//     //console.log(req.params);
//     res.send({fistName:"manzoor", lastName:"elahi", age:25 });
// });
// app.post("/user",(req,res)=>{
//     res.send("data save to database");
// });
// app.put("/user",(req,res)=>{
//     res.send("data updated in database");
// });
// app.delete("/user",(req,res)=>{
//     res.send("data deleted from database");
// });

// app.use("/test",(req,res) =>{
//     res.send("hey my name is test");
// });
connectDB()
.then(()=>{
    console.log("Database connected successfully");
    app.listen(7777,()=>{
    console.log("server is running on port 7777");
})
}).catch((err)=>{
    console.error("Database connection failed", err);   
}
);



