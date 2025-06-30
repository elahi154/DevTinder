const express=require('express');

const app=express();


app.get("user/:useId",(req,res)=>{
    //console.log(req.params);
    res.send({fistName:"manzoor", lastName:"elahi", age:25 });
});
app.post("/user",(req,res)=>{
    res.send("data save to database");
});
app.put("/user",(req,res)=>{
    res.send("data updated in database");
});
app.delete("/user",(req,res)=>{
    res.send("data deleted from database");
});

app.use("/test",(req,res) =>{
    res.send("hey my name is test");
});

app.listen(7777,()=>{
    console.log("server is running on port 7777");
})

