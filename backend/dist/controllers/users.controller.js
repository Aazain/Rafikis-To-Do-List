"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Express = void 0;
var users_model_1 = require("../models/users.model");
var user_services_1 = require("../services/user.services");
var Express = /** @class */ (function () {
    function Express(app) {
        this.app = app;
    }
    Express.prototype.getUsers = function () {
        this.app.get("/users", function (req, res) {
            users_model_1.Users.find({}, function (err, foundData) {
                if (err) {
                    return res.status(404).send("Unable to find Users");
                }
                else {
                    return res.send(__spreadArray([], foundData));
                }
            });
        });
    };
    Express.prototype.signUp = function () {
        this.app.post("/users/signup", function (req, res) {
            var userEmail = req.body.email;
            var userPassword = req.body.password;
            var userService = new user_services_1.userServices(userEmail, userPassword);
            var createUser = userService.signUpUser();
        });
    };
    return Express;
}());
exports.Express = Express;
