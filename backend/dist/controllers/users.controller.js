"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserControllerService = void 0;
const user_services_1 = require("../services/user.services");
const token_services_1 = require("../services/token.services");
const password_services_1 = require("../services/password.services");
const email_validation_1 = require("../services/email.validation");
var UserControllerService;
(function (UserControllerService) {
    UserControllerService["ERROR"] = "ERROR";
    UserControllerService["SUCCESS"] = "SUCCESS";
})(UserControllerService = exports.UserControllerService || (exports.UserControllerService = {}));
class userController {
    constructor(app) {
        this.app = app;
    }
    async signUp(req, res) {
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const userService = new user_services_1.UserService(userEmail, userPassword);
        const validateEmail = new email_validation_1.emailValidation;
        const emailCheck = validateEmail.validate(userEmail);
        if (!userPassword) {
            return res.status(403).send({ message: "please enter a password" });
        }
        else {
            if (emailCheck == true) {
                const createUser = await userService.createUser();
                if (createUser == UserControllerService.ERROR) {
                    return res.status(409).send({ message: "a user with this email already exists" });
                }
                else {
                    return res.status(201).send({ message: "successfully created user" });
                }
            }
            else {
                return res.status(403).send({ message: "please enter a valid email and password" });
            }
        }
    }
    async logIn(req, res) {
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const validateEmail = new email_validation_1.emailValidation;
        const emailCheck = validateEmail.validate(userEmail);
        if (emailCheck == true) {
            const userService = new user_services_1.UserService(userEmail, userPassword);
            const loginUser = await userService.userLogin();
            if (loginUser == password_services_1.PasswordAuth.INCORRECT) {
                return res.status(403).send({ message: "incorrect email or password" });
            }
            else if (!userPassword) {
                return res.status(403).send({ message: "please enter a password" });
            }
            else if (loginUser == UserControllerService.ERROR) {
                return res.status(404).send({ message: "user does not exist" });
            }
            else {
                return res.send(loginUser);
            }
        }
        else {
            return res.status(403).send({ message: "please enter a valid email" });
        }
    }
    async refreshToken(req, res) {
        const user = new user_services_1.UserService(req.body.email);
        const findUser = await user.findUser();
        if (!findUser) {
            return res.status(404).send({ message: "user not found" });
        }
        const userInfo = {
            _id: findUser._id.toString(),
            email: findUser.email ?? ''
        };
        const authHeader = req.headers["authorization"];
        const refreshToken = authHeader?.split(" ")[1];
        const refreshTokenService = new token_services_1.TokenService();
        const refreshAccess = refreshTokenService.refreshAccessToken(refreshToken, userInfo);
        if (refreshAccess == token_services_1.TokenStatus.INVALID) {
            return res.status(400).send({ message: "invalid token" });
        }
        else if (refreshAccess == token_services_1.TokenStatus.ERROR) {
            return res.status(400).send({ message: "please provide an access token" });
        }
        else {
            return res.status(200).send(refreshAccess);
        }
    }
}
exports.userController = userController;
