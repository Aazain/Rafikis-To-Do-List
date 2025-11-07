"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = void 0;
const mongoose_1 = require("mongoose");
const listSchema = new mongoose_1.Schema({
    userId: String,
    task: String,
    status: Boolean
}, {
    timestamps: true
});
exports.Items = (0, mongoose_1.model)("Items", listSchema);
