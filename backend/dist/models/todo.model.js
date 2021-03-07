"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var listSchema = new mongoose_1.Schema({
    userId: String,
    task: String,
    status: Boolean
}, {
    timestamps: true
});
var Items = mongoose_1.model("Items", listSchema);
