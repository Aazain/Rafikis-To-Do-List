"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    email: String,
    password: String
});
exports.Users = mongoose_1.model("Users", userSchema);
