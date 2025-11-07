"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = exports.ItemServiceStatus = void 0;
const todo_model_1 = require("../models/todo.model");
var ItemServiceStatus;
(function (ItemServiceStatus) {
    ItemServiceStatus["UNABLE"] = "UNABLE";
    ItemServiceStatus["ERROR"] = "ItemServiceError";
    ItemServiceStatus["SUCCESS"] = "ItemServiceSuccess";
    ItemServiceStatus["FORBIDDEN"] = "Forbidden";
})(ItemServiceStatus = exports.ItemServiceStatus || (exports.ItemServiceStatus = {}));
class ItemService {
    constructor(currentUser) {
        this.currentUser = currentUser;
    }
    checkItemId(params = "fawfaw") {
        return todo_model_1.Items.find({ _id: params });
    }
    async getSingleItem(params) {
        const id = params;
        try {
            const result = await todo_model_1.Items.findOne({ _id: id });
            if (!result || !result.userId) {
                return ItemServiceStatus.UNABLE;
            }
            if (!result) {
                return ItemServiceStatus.UNABLE;
            }
            else if (result.userId.toString() !== this.currentUser.user._id.toString()) {
                return ItemServiceStatus.FORBIDDEN;
            }
            return result;
        }
        catch (err) {
            console.error(err);
            return ItemServiceStatus.ERROR;
        }
    }
    async getItemList() {
        try {
            const items = await todo_model_1.Items.find({ userId: this.currentUser.user._id });
            if (!items) {
                return ItemServiceStatus.UNABLE;
            }
            return items;
        }
        catch (err) {
            console.error(err);
            return ItemServiceStatus.UNABLE;
        }
    }
    async deleteItem(itemId, userId) {
        try {
            const deletedItem = await todo_model_1.Items.findOneAndDelete({ _id: itemId, userId });
            if (!deletedItem) {
                return ItemServiceStatus.FORBIDDEN;
            }
            const checkDelete = await todo_model_1.Items.find({ _id: itemId });
            if (checkDelete.length !== 0) {
                return ItemServiceStatus.UNABLE;
            }
            return ItemServiceStatus.SUCCESS;
        }
        catch (err) {
            return ItemServiceStatus.UNABLE;
        }
    }
    newTask(userId, task, status) {
        const itemList = new todo_model_1.Items({
            userId,
            task,
            status
        });
        itemList.save()
            .then(() => {
            return ItemServiceStatus.SUCCESS;
        })
            .catch((err) => {
            return ItemServiceStatus.UNABLE;
        });
    }
    async updateTask(userId, itemId, task, status) {
        try {
            if (userId !== this.currentUser.user._id.toString()) {
                return ItemServiceStatus.FORBIDDEN;
            }
            const updatedItem = await todo_model_1.Items.findOneAndUpdate({ _id: itemId, userId }, { $set: { task, status } }, { new: true });
            if (!updatedItem) {
                return ItemServiceStatus.ERROR;
            }
            return ItemServiceStatus.SUCCESS;
        }
        catch (err) {
            return ItemServiceStatus.ERROR;
        }
    }
}
exports.ItemService = ItemService;
