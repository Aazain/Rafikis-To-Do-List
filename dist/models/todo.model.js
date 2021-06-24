"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = void 0;
var mongoose_1 = require("mongoose");
var listSchema = new mongoose_1.Schema({
    userId: String,
    task: String,
    status: Boolean
}, {
    timestamps: true
});
exports.Items = mongoose_1.model("Items", listSchema);
