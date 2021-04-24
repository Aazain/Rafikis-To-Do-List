"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemServices = void 0;
var todo_model_1 = require("../models/todo.model");
var ItemServices = /** @class */ (function () {
    function ItemServices(currentUser) {
        this.currentUser = currentUser;
    }
    ItemServices.prototype.getItemList = function () {
        return todo_model_1.Items.find({ userId: this.currentUser.user._id }, function (err, result) {
            if (err) {
                return "unable to get Items";
            }
            else {
                return result;
            }
        });
    };
    ItemServices.prototype.deleteItem = function (itemId) {
        todo_model_1.Items.findOneAndDelete({ _id: itemId, userId: this.currentUser.user._id });
    };
    return ItemServices;
}());
exports.ItemServices = ItemServices;
