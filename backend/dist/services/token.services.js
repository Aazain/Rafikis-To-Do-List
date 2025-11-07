"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = exports.TokenStatus = void 0;
const jwt = require('jsonwebtoken');
var TokenStatus;
(function (TokenStatus) {
    TokenStatus["INVALID"] = "INVALID";
    TokenStatus["ERROR"] = "TokenError";
})(TokenStatus = exports.TokenStatus || (exports.TokenStatus = {}));
class TokenService {
    createAccessToken(currentUser) {
        return jwt.sign({ user: currentUser }, process.env.ACCESSTOKEN, {
            expiresIn: "259200s"
        });
    }
    createRefreshToken(currentUser) {
        return jwt.sign({ user: currentUser }, process.env.REFRESHTOKEN, {
            expiresIn: "604800s"
        });
    }
    refreshAccessToken(refreshToken, currentUser) {
        if (!currentUser) {
            this.tokenServiceStatus = TokenStatus.INVALID;
            return this.tokenServiceStatus;
        }
        else {
            const newToken = jwt.verify(refreshToken, process.env.REFRESHTOKEN, (err, token) => {
                if (!refreshToken) {
                    this.tokenServiceStatus = TokenStatus.ERROR;
                    return this.tokenServiceStatus;
                }
                if (err) {
                    this.tokenServiceStatus = TokenStatus.INVALID;
                    return this.tokenServiceStatus;
                }
                else if (token.user.email != currentUser.email || currentUser === null) {
                    this.tokenServiceStatus = TokenStatus.INVALID;
                    return this.tokenServiceStatus;
                }
                else {
                    const createNewToken = this.createAccessToken(currentUser);
                    return { accessToken: createNewToken };
                }
            });
            return newToken;
        }
    }
    tokenAuth(accessToken) {
        const authenticateToken = jwt.verify(accessToken, process.env.ACCESSTOKEN, (err, user) => {
            if (err) {
                this.tokenServiceStatus = TokenStatus.ERROR;
                return this.tokenServiceStatus;
            }
            else {
                return user;
            }
        });
        return authenticateToken;
    }
}
exports.TokenService = TokenService;
