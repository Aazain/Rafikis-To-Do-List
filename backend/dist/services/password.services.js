"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = exports.PasswordAuth = void 0;
const token_services_1 = require("./token.services");
const bcrypt = require('bcrypt');
require("dotenv/config");
var PasswordAuth;
(function (PasswordAuth) {
    PasswordAuth["INCORRECT"] = "INCORRECT";
})(PasswordAuth = exports.PasswordAuth || (exports.PasswordAuth = {}));
class PasswordService {
    constructor(password, currentUser) {
        this.currentUser = currentUser;
        this.userPassword = password;
    }
    async userAuth() {
        const passwordAuth = await bcrypt.compare(this.userPassword, this.currentUser.password);
        if (!passwordAuth) {
            this.passwordAuthStatus = PasswordAuth.INCORRECT;
            return this.passwordAuthStatus;
        }
        else {
            const token = new token_services_1.TokenService;
            const newToken = token.createAccessToken({ _id: this.currentUser._id, email: this.currentUser.email });
            const refreshToken = token.createRefreshToken({ _id: this.currentUser._id, email: this.currentUser.email });
            return { accessToken: newToken, refreshToken: refreshToken };
        }
    }
}
exports.PasswordService = PasswordService;
