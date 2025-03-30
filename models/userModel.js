const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"please add the user name"],
        unique: [true,"username is already existed."]
    },
    email:{
        type: String,
        required: [true,"please add the user email address"],
        unique: [true,"email address are already taken"]
    },
    password:{
        type: String,
        required: [true,"please add the user password"]
    },
    
},{
    timestamps:true,
});

const myschematype = mongoose.model("User",userSchema);
module.exports = myschematype