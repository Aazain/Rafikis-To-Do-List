"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemServices = void 0;
var todo_model_1 = require("../models/todo.model");
var ItemServices = /** @class */ (function () {
    function ItemServices(currentUser) {
        this.currentUser = currentUser;
    }
    ItemServices.prototype.checkItemId = function (params) {
        return todo_model_1.Items.find({ _id: params });
    };
    ItemServices.prototype.getSingleItem = function (params) {
        var id = params;
        return todo_model_1.Items.findById(id, function (err, result) {
            if (err || result == null) {
                return ("unable to find item");
            }
            else {
                return result;
            }
        });
    };
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
        return todo_model_1.Items.findByIdAndRemove({ _id: itemId, userId: this.currentUser.user._id }, { useFindAndModify: false }, function (err, result) {
            if (err || !result) {
                return "unable to delete task";
            }
            else {
                return "successfully deleted task";
            }
        });
    };
    return ItemServices;
}());
exports.ItemServices = ItemServices;
