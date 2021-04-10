import express from "express";
import mongoose from "mongoose";
require("dotenv/config")
const app = express();

mongoose.connect(`${process.env.DB_PASS}`, {useNewUrlParser: true, useUnifiedTopology: true },() => console.log("Connected to DB..."));


let port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log("Server running on port:", port)
})