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
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
})


const user = new userController(app)
app.get("/users", user.getUsers);
app.post("/users/signup", user.signUp);
app.post("/users/login", user.logIn);
app.post("/newAccessToken", user.refreshToken);


const todo = new todoController(app)
app.get("/todo", todo.getItems);
app.get("/todo/:id", todo.getSingleItem);
app.delete("/todo/:id", todo.deleteItems);


let port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log("Server running on port:", port)
})