"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareService = void 0;
var token_services_1 = require("../services/token.services");
var middlewareService = /** @class */ (function () {
    function middlewareService() {
    }
    middlewareService.prototype.tokenAuthentication = function (req, res) {
        var authHeader = req.headers["authorization"];
        var token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        var jwtService = new token_services_1.tokenService();
        var authResult = jwtService.tokenAuth(token);
        console.log("fwafwa");
    };
    return middlewareService;
}());
exports.middlewareService = middlewareService;
