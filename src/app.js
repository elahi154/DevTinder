const express=require('express');
const {auth,user} = require('./Middleare/Auth');
const connectDB  = require('./config/databse');
const User = require('./models/userSchema');



const app=express();

app.use("/admin",auth);


app.post("/signup",async(req,res)=>{
    const user = new User({
        firstName:"suman",
        lastName:"kumar",
        email:"suman@gmail.com",
        password:"123456"

    });
    try {
        await user.save();
        res.send("user created successfully");
        
    } catch (error) {
        res.status(400).send("Error creating user: " + error.message);
    }
    
})

app.get("/admin/getAllData",(req,res)=>{
   res.send("send all the data ");
});
app.get("/admin/deleteAllData",(req,res)=>{
   res.send("delete all the data from data baase ")
})
app.get("/user",user ,(req,res)=>{
    res.send("hey this is user data ");
})
app.get("/user/login-page",(req,res)=>{
    res.send("this is login oage ");
})

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



