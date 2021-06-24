"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var users_controller_1 = require("./controllers/users.controller");
var todo_controller_1 = require("./controllers/todo.controller");
require("dotenv/config");
var app = express_1.default();
var bodyParser = require('body-parser');
var cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose_1.default.connect("" + process.env.DB_PASS, { useNewUrlParser: true, useUnifiedTopology: true }, function () { return console.log("Connected to DB..."); });
app.use(cors({ origin: "*" }));
app.options('*', cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
var user = new users_controller_1.userController(app);
app.post("/users/signup", user.signUp);
app.post("/users/login", user.logIn);
app.post("/newAccessToken", user.refreshToken);
var todo = new todo_controller_1.todoController(app);
app.get("/todo", todo.getItems);
app.delete("/todo/:id", todo.deleteItems);
app.post("/todo", todo.createItem);
app.patch("/todo/:id", todo.updateItem);
var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("Server running on port:", port);
});
