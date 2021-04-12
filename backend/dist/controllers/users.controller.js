"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
var users_model_1 = require("../models/users.model");
var user_services_1 = require("../services/user.services");
var token_services_1 = require("../services/token.services");
var userController = /** @class */ (function () {
    function userController(app) {
        this.app = app;
    }
    userController.prototype.getUsers = function () {
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
    userController.prototype.signUp = function () {
        var _this = this;
        this.app.post("/users/signup", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userEmail, userPassword, userService, createUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userEmail = req.body.email;
                        userPassword = req.body.password;
                        userService = new user_services_1.userServices(userEmail, userPassword);
                        return [4 /*yield*/, userService.createUser()];
                    case 1:
                        createUser = _a.sent();
                        res.send(createUser);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    userController.prototype.logIn = function () {
        var _this = this;
        this.app.post("/users/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userEmail, userPassword, userService, loginUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userEmail = req.body.email;
                        userPassword = req.body.password;
                        userService = new user_services_1.userServices(userEmail, userPassword);
                        return [4 /*yield*/, userService.userLogin()];
                    case 1:
                        loginUser = _a.sent();
                        res.send(loginUser);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    userController.prototype.refreshToken = function () {
        var _this = this;
        this.app.post("/newAccessToken", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user, findUser, authHeader, refreshToken, refreshTokenService, refreshAccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new user_services_1.userServices(req.body.email, req.body.password);
                        return [4 /*yield*/, user.findUser()];
                    case 1:
                        findUser = _a.sent();
                        authHeader = req.headers["authorization"];
                        refreshToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
                        refreshTokenService = new token_services_1.tokenService();
                        refreshAccess = refreshTokenService.refreshAccessToken(refreshToken, findUser);
                        res.send(refreshAccess);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return userController;
}());
exports.userController = userController;
