"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_controller_1 = require("./controllers/users.controller");
const todo_controller_1 = require("./controllers/todo.controller");
require("dotenv/config");
const app = (0, express_1.default)();
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose_1.default.connect(`${process.env.DB_PASS}`)
    .then(() => console.log("Connected to DB..."))
    .catch((err) => console.error("DB connection error:", err));
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
const user = new users_controller_1.userController(app);
app.post("/users/signup", user.signUp);
app.post("/users/login", user.logIn);
app.post("/newAccessToken", user.refreshToken);
const todo = new todo_controller_1.todoController(app);
app.get("/todo", todo.getItems);
app.delete("/todo/:id", todo.deleteItems);
app.post("/todo", todo.createItem);
app.patch("/todo/:id", todo.updateItem);
let port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Server running on port:", port);
});
