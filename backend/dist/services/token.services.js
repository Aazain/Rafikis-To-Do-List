"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
var jwt = require('jsonwebtoken');
var TokenService = /** @class */ (function () {
    function TokenService() {
    }
    TokenService.prototype.createAccessToken = function (currentUser) {
        return jwt.sign({ user: currentUser }, process.env.ACCESSTOKEN, {
            expiresIn: "259200s"
        });
    };
    TokenService.prototype.createRefreshToken = function (currentUser) {
        return jwt.sign({ user: currentUser }, process.env.REFRESHTOKEN, {
            expiresIn: "604800s"
        });
    };
    TokenService.prototype.refreshAccessToken = function (refreshToken, currentUser) {
        var _this = this;
        if (!refreshToken) {
            return "Error";
        }
        var newToken = jwt.verify(refreshToken, process.env.REFRESHTOKEN, function (err, token) {
            if (err) {
                return "invalid token";
            }
            else {
                var createNewToken = _this.createAccessToken(currentUser);
                return { accessToken: createNewToken };
            }
        });
        return newToken;
    };
    TokenService.prototype.tokenAuth = function (accessToken) {
        var authenticateToken = jwt.verify(accessToken, process.env.ACCESSTOKEN, function (err, user) {
            if (err) {
                console.log(err);
                return "forbidden";
            }
            else {
                return user;
            }
        });
        return authenticateToken;
    };
    return TokenService;
}());
exports.TokenService = TokenService;
