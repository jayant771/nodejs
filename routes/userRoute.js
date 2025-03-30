const express = require("express");
const myapp = express.Router();

const {registerUser,loginUser,currentUser} = require("../Controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

myapp.post("/register",registerUser);
// router.post("/api/user/register",registerUser);

myapp.post("/login",loginUser);


myapp.get("/current", validateToken, currentUser);

module.exports = router; 