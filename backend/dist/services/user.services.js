"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const users_model_1 = require("../models/users.model");
const password_services_1 = require("./password.services");
const users_controller_1 = require("../controllers/users.controller");
const bcrypt = require('bcrypt');
class UserService {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    async createUser() {
        const checkEmail = await this.findUser();
        if (checkEmail !== null) {
            this.userControllerService = users_controller_1.UserControllerService.ERROR;
            return this.userControllerService;
        }
        else {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            const userList = new users_model_1.Users({
                email: this.email,
                password: hashedPassword
            });
            this.userControllerService = users_controller_1.UserControllerService.SUCCESS;
            userList.save();
            return this.userControllerService;
        }
    }
    async userLogin() {
        const currentUser = await this.findUser();
        if (!currentUser) {
            this.userControllerService = users_controller_1.UserControllerService.ERROR;
            return this.userControllerService;
        }
        else {
            const userInfo = {
                _id: currentUser._id.toString(),
                email: currentUser.email ?? '',
                password: currentUser.password ?? '',
                __v: currentUser.__v ?? 0
            };
            const passService = new password_services_1.PasswordService(this.password, userInfo);
            const loginAuth = await passService.userAuth();
            return loginAuth;
        }
    }
    async findUser() {
        const currentUser = await users_model_1.Users.findOne({ email: this.email });
        return currentUser;
    }
}
exports.UserService = UserService;
