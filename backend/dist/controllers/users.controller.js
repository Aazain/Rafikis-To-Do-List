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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserControllerService = void 0;
var user_services_1 = require("../services/user.services");
var token_services_1 = require("../services/token.services");
var password_services_1 = require("../services/password.services");
var email_validation_1 = require("../services/email.validation");
var UserControllerService;
(function (UserControllerService) {
    UserControllerService["ERROR"] = "ERROR";
    UserControllerService["SUCCESS"] = "SUCCESS";
})(UserControllerService = exports.UserControllerService || (exports.UserControllerService = {}));
var userController = /** @class */ (function () {
    function userController(app) {
        this.app = app;
    }
    userController.prototype.signUp = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userEmail, userPassword, userService, validateEmail, emailCheck, createUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userEmail = req.body.email;
                        userPassword = req.body.password;
                        userService = new user_services_1.UserService(userEmail, userPassword);
                        validateEmail = new email_validation_1.emailValidation;
                        emailCheck = validateEmail.validate(userEmail);
                        if (!!userPassword) return [3 /*break*/, 1];
                        return [2 /*return*/, res.status(403).send({ message: "please enter a password" })];
                    case 1:
                        if (!(emailCheck == true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, userService.createUser()];
                    case 2:
                        createUser = _a.sent();
                        if (createUser == UserControllerService.ERROR) {
                            return [2 /*return*/, res.status(409).send({ message: "a user with this email already exists" })];
                        }
                        else {
                            return [2 /*return*/, res.status(201).send({ message: "successfully created user" })];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, res.status(403).send({ message: "please enter a valid email and password" })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.logIn = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userEmail, userPassword, validateEmail, emailCheck, userService, loginUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userEmail = req.body.email;
                        userPassword = req.body.password;
                        validateEmail = new email_validation_1.emailValidation;
                        emailCheck = validateEmail.validate(userEmail);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(emailCheck == true)) return [3 /*break*/, 3];
                        userService = new user_services_1.UserService(userEmail, userPassword);
                        return [4 /*yield*/, userService.userLogin()];
                    case 2:
                        loginUser = _a.sent();
                        if (loginUser == password_services_1.PasswordAuth.INCORRECT) {
                            return [2 /*return*/, res.status(403).send({ message: "incorrect email or password" })];
                        }
                        else if (!userPassword) {
                            return [2 /*return*/, res.status(403).send({ message: "please enter a password" })];
                        }
                        else if (loginUser == UserControllerService.ERROR) {
                            return [2 /*return*/, res.status(404).send({ message: "user does not exist" })];
                        }
                        else {
                            return [2 /*return*/, res.send(loginUser)];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, res.status(403).send({ message: "please enter a valid email" })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    userController.prototype.refreshToken = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, findUser, authHeader, refreshToken, refreshTokenService, refreshAccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new user_services_1.UserService(req.body.email);
                        return [4 /*yield*/, user.findUser()];
                    case 1:
                        findUser = _a.sent();
                        authHeader = req.headers["authorization"];
                        refreshToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
                        refreshTokenService = new token_services_1.TokenService();
                        refreshAccess = refreshTokenService.refreshAccessToken(refreshToken, findUser);
                        if (refreshAccess == token_services_1.TokenStatus.INVALID) {
                            return [2 /*return*/, res.status(400).send({ message: "invalid token" })];
                        }
                        else if (refreshAccess == token_services_1.TokenStatus.ERROR) {
                            return [2 /*return*/, res.status(400).send({ message: "please provide an access token" })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).send(refreshAccess)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return userController;
}());
exports.userController = userController;
