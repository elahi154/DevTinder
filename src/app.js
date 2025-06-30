const express=require('express');
const auth = require('./Middleare/Auth');

const app=express();

app.use("/admin",auth);

app.get("/admin/getAllData",(req,res)=>{
   res.send("send all the data ");
});
app.get("/admin/deleteAllData",(req,res)=>{
   res.send("delete all the data from data baase ")
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

app.listen(7777,()=>{
    console.log("server is running on port 7777");
})

