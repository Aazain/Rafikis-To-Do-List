"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: String,
    password: String
});
exports.Users = (0, mongoose_1.model)("Users", userSchema);
