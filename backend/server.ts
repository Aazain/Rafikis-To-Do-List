import express, { request, response } from "express";
import mongoose from "mongoose";
import { userController } from "./controllers/users.controller"
import { todoController } from "./controllers/todo.controller"
require("dotenv/config")
const app = express();
const bodyParser = require('body-parser')
const cors = require("cors")

app.use(bodyParser.json())  
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(`${process.env.DB_PASS}`, {useNewUrlParser: true, useUnifiedTopology: true },() => console.log("Connected to DB..."));
app.use(cors({origin: "*"}));
app.options('*', cors()) ;


app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Headers", "x-requested-with, x-requested-by");
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    next(); 
})

const user = new userController(app)
app.post("/users/signup", user.signUp);
app.post("/users/login", user.logIn);
app.post("/newAccessToken", user.refreshToken);


const todo = new todoController(app)
app.get("/todo", todo.getItems);
app.delete("/todo/:id", todo.deleteItems);
app.post("/todo", todo.createItem);
app.patch("/todo/:id", todo.updateItem);


let port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log("Server running on port:", port)
})