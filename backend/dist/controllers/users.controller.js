"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_model_1 = require("../models/users.model");
var app = express_1.default();
module.exports = function (app) {
    app.get("/", function (req, res) {
        users_model_1.Users.find({}, function (err, foundData) {
            if (err) {
                res.status(404).send("Unable to find Users");
            }
            else {
                res.send({ foundData: foundData });
            }
        });
    });
};
