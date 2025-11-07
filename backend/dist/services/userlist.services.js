"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userList = void 0;
const users_model_1 = require("../models/users.model");
class userList {
    static getUserList() {
        throw new Error("Method not implemented.");
    }
    async getUserList() {
        const allUsers = await users_model_1.Users.find({}, (err, result) => {
            if (err) {
                return null;
            }
            else {
                return result;
            }
        });
        return allUsers;
    }
}
exports.userList = userList;
