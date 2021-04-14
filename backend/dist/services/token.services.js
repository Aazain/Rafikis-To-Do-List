"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
var jwt = require('jsonwebtoken');
var tokenService = /** @class */ (function () {
    function tokenService() {
    }
    tokenService.prototype.createAccessToken = function (currentUser) {
        return jwt.sign({ user: currentUser }, process.env.ACCESSTOKEN, {
            expiresIn: "259200"
        });
    };
    tokenService.prototype.createRefreshToken = function (currentUser) {
        return jwt.sign({ user: currentUser }, process.env.REFRESHTOKEN, {
            expiresIn: "604800s"
        });
    };
    tokenService.prototype.refreshAccessToken = function (refreshToken, currentUser) {
        var _this = this;
        if (!refreshToken) {
            return "Error";
        }
        var newToken = jwt.verify(refreshToken, process.env.REFRESHTOKEN, function (err, token) {
            if (err) {
                return err;
            }
            else {
                var createNewToken = _this.createAccessToken(currentUser);
                return { accessToken: createNewToken };
            }
        });
        return newToken;
    };
    tokenService.prototype.tokenAuth = function (accessToken) {
        var authenticateToken = jwt.verify(accessToken, process.env.ACCESSTOKEN, function (err, user) {
            if (err) {
                return "Forbidden";
            }
            else {
                return user;
            }
        });
        return authenticateToken;
    };
    return tokenService;
}());
exports.tokenService = tokenService;
