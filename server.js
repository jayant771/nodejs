const express = require("express");
const errorHandler = require("./middleware/errorHandler")
const {connect} = require("mongoose");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config(); 
const cors = require("cors")



connectDb();
const app = express();

app.get("/", (req, res) => {
    res.send("Hello, your Node.js app is working!");
});

const Port = process.env.PORT || 5000;   

app.use(cors());
app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoute"))
app.use("/api/users",require("./routes/userRoute"))
app.use(errorHandler);

app.listen(Port, ()=>{
console.log(`server is running on ${Port}`)
});
 