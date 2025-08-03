const express=require('express');
const connectDB  = require('./config/databse');
const User = require('./models/userSchema');
const cors  = require('cors')
require('dotenv').config()

// Assuming you have a bcrypt utility for hashing passwords
const cookieParser = require('cookie-parser');
const Jwt = require('jsonwebtoken');

const authRoute =require('./routes/userAuth');
const profileRouter = require('./routes/userProfile');
const requestRouter = require('./routes/requestCon');



const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use("/",authRoute);
app.use("/",profileRouter);
app.use("/",requestRouter);














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



