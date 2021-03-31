"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_model_1 = require("../models/users.model");
var app = express_1.default();
module.exports = function (app) {
    var Express = /** @class */ (function () {
        function Express() {
        }
        Express.prototype.getUsers = function () {
            app.get("/users", function (req, res) {
                users_model_1.Users.find({}, function (err, foundData) {
                    if (err) {
                        res.status(404).send("Unable to find Users");
                    }
                    else {
                        res.send(__spreadArray([], foundData));
                    }
                });
            });
        };
        return Express;
    }());
    var express = new Express;
    express.getUsers();
};
