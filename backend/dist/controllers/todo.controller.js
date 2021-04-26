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
exports.todoController = void 0;
var token_services_1 = require("../services/token.services");
var items_services_1 = require("../services/items.services");
var todoController = /** @class */ (function () {
    function todoController(app) {
        this.app = app;
    }
    todoController.prototype.getSingleItem = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenAuthentication, authHeader, accessToken, auth, itemId, itemService, getItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenAuthentication = new token_services_1.TokenService();
                        authHeader = req.headers["authorization"];
                        accessToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
                        auth = tokenAuthentication.tokenAuth(accessToken);
                        if (!(auth == "forbidden")) return [3 /*break*/, 1];
                        return [2 /*return*/, res.status(403).send("forbidden")];
                    case 1:
                        itemId = req.params.id;
                        itemService = new items_services_1.ItemServices(auth);
                        return [4 /*yield*/, itemService.getSingleItem(itemId)];
                    case 2:
                        getItem = _a.sent();
                        if (getItem == "unable to find item" || !getItem) {
                            return [2 /*return*/, res.status(404).send("unable to find item")];
                        }
                        else {
                            return [2 /*return*/, res.status(200).send(getItem)];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    todoController.prototype.getItems = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenAuthentication, authHeader, accessToken, auth, itemService, getItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenAuthentication = new token_services_1.TokenService();
                        authHeader = req.headers["authorization"];
                        accessToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
                        auth = tokenAuthentication.tokenAuth(accessToken);
                        if (!(auth == "forbidden")) return [3 /*break*/, 1];
                        return [2 /*return*/, res.status(403).send(auth)];
                    case 1:
                        itemService = new items_services_1.ItemServices(auth);
                        return [4 /*yield*/, itemService.getItemList()];
                    case 2:
                        getItems = _a.sent();
                        if (getItems == "unable to get Items") {
                            return [2 /*return*/, res.status(404).send(getItems)];
                        }
                        else {
                            return [2 /*return*/, res.send(getItems)];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    todoController.prototype.deleteItems = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenAuthentication, authHeader, accessToken, auth, itemId, itemService, itemCheck, deleteItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenAuthentication = new token_services_1.TokenService();
                        authHeader = req.headers["authorization"];
                        accessToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
                        auth = tokenAuthentication.tokenAuth(accessToken);
                        if (!(auth == "forbidden")) return [3 /*break*/, 1];
                        return [2 /*return*/, res.status(403).send("forbidden")];
                    case 1:
                        itemId = req.params;
                        itemService = new items_services_1.ItemServices(auth);
                        return [4 /*yield*/, itemService.checkItemId(itemId.id)];
                    case 2:
                        itemCheck = _a.sent();
                        if (!(itemCheck.length === 0)) return [3 /*break*/, 3];
                        return [2 /*return*/, res.status(404).send("item does not exist")];
                    case 3: return [4 /*yield*/, itemService.deleteItem(itemId.id)];
                    case 4:
                        deleteItem = _a.sent();
                        if (deleteItem == "unable to delete task" || !deleteItem) {
                            return [2 /*return*/, res.status(500).send("unable to delete task")];
                        }
                        else {
                            return [2 /*return*/, res.status(202).send("successfully deleted task ")];
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return todoController;
}());
exports.todoController = todoController;
