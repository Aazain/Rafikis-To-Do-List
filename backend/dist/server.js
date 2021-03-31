"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
var todoController = require("./controllers/users.controller");
var app = express_1.default();
mongoose_1.default.connect("" + process.env.DB_PASS, { useNewUrlParser: true, useUnifiedTopology: true }, function () { return console.log("Connected to DB..."); });
todoController(app);
var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("Server running on port:", port);
});
