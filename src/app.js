const express=require('express');

const app=express();


app.use("/contact",(req,res) =>{
    res.send("hey my name is contact");
}); 
app.use("/about/2",(req,res) =>{
    res.send("hey my name is about 22222");
});
app.use("/about",(req,res) =>{
    res.send("hey my name is about");
});
app.use("/",(req,res) =>{
    res.send("hey my name is home");
});

app.listen(7777,()=>{
    console.log("server is running on port 7777");
})

