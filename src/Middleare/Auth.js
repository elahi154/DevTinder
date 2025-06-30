const auth = (req,res,next)=>{
    console.log("call admin");
    const tokens = "xyz";
    isAuthentated = tokens === "xyz";
    if(!isAuthentated){
        return res.status(401).send("you are not authenticated");
    }
    else{
        next();
    }
}
module.exports = auth;