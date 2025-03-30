const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const myschematype = require("../models/userModel");


// disc register a user 
// @route POST /api/user/registerUser
// @access public 
const registerUser = async (req,res)=> {
    const {username,email,password} = req.body;  
    
    // Check if all fields are provided
    if(!username || !password || !email){
        res.status(400);
        throw new Error("all fields are Mandatory!");
    }

    // Check if user already exists by email
    const userAvailable = await myschematype.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered with this email");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the hashed password
    const user = new myschematype({
        username,
        email,
        password: hashedPassword,
    });
    
    {
        await user.save();
        res.status(200).json({message:"Register the user",statuscode:584});
    }
};


// disc login user 
// @route POST /api/user/loginUser
// @access public 
const loginUser = async (req,res)=> {
    const {email,password}=req.body;

    // Check if all fields are provided
    if(!email|| !password){
        res.status(400);
        throw new Error('all field are mandatory');
    }

    // Find user by email
    const user = await myschematype.findOne({email}); 
    
    //compare password with user hashed hashedpassword
    if(user && await bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60m" } 
    );
        res.status(200).json({accessToken}); 
    } else{
        res.status(401);
        throw new Error("Email or Password is not valid");
    };

};


// dis curreng user info
// @route POST /api/user/currentUser
// @access private 
const currentUser = asyncHandler(async (req,res)=> {
    res.json(req.user);
});

module.exports = {registerUser,loginUser,currentUser};