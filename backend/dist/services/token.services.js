"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = exports.TokenStatus = void 0;
var jwt = require('jsonwebtoken');
var TokenStatus;
(function (TokenStatus) {
    TokenStatus["INVALID"] = "INVALID";
    TokenStatus["ERROR"] = "TokenError";
})(TokenStatus = exports.TokenStatus || (exports.TokenStatus = {}));
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
            this.tokenServiceStatus = TokenStatus.ERROR;
            return this.tokenServiceStatus;
        }
        else {
            var newToken = jwt.verify(refreshToken, process.env.REFRESHTOKEN, function (err, token) {
                if (err) {
                    _this.tokenServiceStatus = TokenStatus.INVALID;
                    return _this.tokenServiceStatus;
                }
                else {
                    var createNewToken = _this.createAccessToken(currentUser);
                    return { accessToken: createNewToken };
                }
            });
            return newToken;
        }
    };
    TokenService.prototype.tokenAuth = function (accessToken) {
        var _this = this;
        var authenticateToken = jwt.verify(accessToken, process.env.ACCESSTOKEN, function (err, user) {
            if (err) {
                _this.tokenServiceStatus = TokenStatus.ERROR;
                return _this.tokenServiceStatus;
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
