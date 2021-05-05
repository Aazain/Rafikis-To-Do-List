"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = exports.ItemServiceStatus = void 0;
var todo_model_1 = require("../models/todo.model");
var ItemServiceStatus;
(function (ItemServiceStatus) {
    ItemServiceStatus["UNABLE"] = "UNABLE";
    ItemServiceStatus["ERROR"] = "ItemServiceError";
    ItemServiceStatus["SUCCESS"] = "ItemServiceSuccess";
})(ItemServiceStatus = exports.ItemServiceStatus || (exports.ItemServiceStatus = {}));
var ItemService = /** @class */ (function () {
    function ItemService(currentUser) {
        this.currentUser = currentUser;
    }
    ItemService.prototype.checkItemId = function (params) {
        var _this = this;
        return todo_model_1.Items.find({ _id: params }, function (err) {
            if (err) {
                _this.itemStatus = ItemServiceStatus.ERROR;
                return _this.itemStatus;
            }
        });
    };
    ItemService.prototype.getSingleItem = function (params) {
        var _this = this;
        var id = params;
        return todo_model_1.Items.findById(id, function (err, result) {
            if (err || result == null) {
                _this.itemStatus = ItemServiceStatus.UNABLE;
                return _this.itemStatus;
            }
            else if (_this.currentUser.user._id !== result.userId) {
                _this.itemStatus = ItemServiceStatus.ERROR;
                return _this.itemStatus;
            }
            else {
                return result;
            }
        });
    };
    ItemService.prototype.getSingleItems = function (params) {
        var _this = this;
        var id = params;
        try {
            var promide = new Promise(function (reject, resolve) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    todo_model_1.Items.findById(id, function (err, result) {
                        if (err || result == null) {
                            reject(ItemServiceStatus.UNABLE);
                        }
                        else if (_this.currentUser.user._id !== result.userId) {
                            reject(ItemServiceStatus.ERROR);
                        }
                        else {
                            resolve(result);
                        }
                    });
                    return [2 /*return*/];
                });
            }); });
            return promide;
        }
        catch (err) {
            return err;
        }
    };
    ItemService.prototype.getItemList = function () {
        var _this = this;
        return todo_model_1.Items.find({ userId: this.currentUser.user._id }, function (err, result) {
            if (err) {
                _this.itemStatus = ItemServiceStatus.UNABLE;
                return _this.itemStatus;
            }
            else {
                return result;
            }
        });
    };
    ItemService.prototype.deleteItem = function (itemId) {
        var _this = this;
        return todo_model_1.Items.findByIdAndRemove({ _id: itemId, userId: this.currentUser.user._id }, { useFindAndModify: false }, function (err, result) {
            if (err) {
                _this.itemStatus = ItemServiceStatus.UNABLE;
                return _this.itemStatus;
            }
            else {
                return ItemServiceStatus.SUCCESS;
            }
        });
    };
    ItemService.prototype.newTask = function (userId, task, status) {
        var _this = this;
        var itemList = new todo_model_1.Items({
            userId: userId,
            task: task,
            status: status
        });
        itemList.save()
            .then(function () {
            return ItemServiceStatus.SUCCESS;
        })
            .catch(function (err) {
            _this.itemStatus = ItemServiceStatus.UNABLE;
            return _this.itemStatus;
        });
    };
    ItemService.prototype.updateTask = function (userId, itemId, task, status) {
        var _this = this;
        var updatePromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, todo_model_1.Items.findOneAndUpdate({
                            userId: userId,
                            _id: itemId
                        }, {
                            $set: {
                                task: task,
                                status: status
                            }
                        }, {
                            useFindAndModify: false
                        }, function (err) {
                            if (err) {
                                reject(ItemServiceStatus.ERROR);
                            }
                            else {
                                resolve(ItemServiceStatus.SUCCESS);
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return updatePromise;
    };
    return ItemService;
}());
exports.ItemService = ItemService;
