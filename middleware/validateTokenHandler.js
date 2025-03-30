const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (authHeader && authHeader.toLowerCase().startsWith("bearer")){
        token= authHeader.split(" ")[1];

        // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
        //     if(err){
        //         res.status(401);
        //         throw new Error("user is not authorized");
        //     }
        //     req.user = decoded.user;
        //     next();
        // });
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded.user; // Attach decoded user info to request
            next();
        } catch (err) {
            return res.status(401).json({ error: "User is not authorized" });
        }
    };
    if (!token) {
        return res.status(401).json({ error: "User is not authorized or token is missing" });
    }

});

module.exports = validateToken;