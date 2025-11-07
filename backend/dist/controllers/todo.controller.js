"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoController = void 0;
const token_services_1 = require("../services/token.services");
const items_services_1 = require("../services/items.services");
const mongoose_1 = require("mongoose");
class todoController {
    constructor(app) {
        this.app = app;
    }
    async getItems(req, res) {
        const tokenAuthentication = new token_services_1.TokenService();
        const authHeader = req.headers["authorization"];
        const accessToken = authHeader?.split(" ")[1];
        const auth = tokenAuthentication.tokenAuth(accessToken);
        if (auth == token_services_1.TokenStatus.ERROR) {
            return res.status(403).send("forbidden");
        }
        else {
            const itemService = new items_services_1.ItemService(auth);
            const getItems = await itemService.getItemList();
            if (getItems === items_services_1.ItemServiceStatus.UNABLE) {
                return res.status(404).send("unable to get items");
            }
            else {
                return res.send(getItems);
            }
        }
    }
    async deleteItems(req, res) {
        const tokenAuthentication = new token_services_1.TokenService();
        const authHeader = req.headers["authorization"];
        const accessToken = authHeader?.split(" ")[1];
        const auth = tokenAuthentication.tokenAuth(accessToken);
        const itemIdValidity = (0, mongoose_1.isValidObjectId)(req.params.id);
        if (itemIdValidity !== true) {
            return res.status(404).send("item does not exist");
        }
        else {
            if (auth == token_services_1.TokenStatus.ERROR) {
                return res.status(403).send("forbidden");
            }
            else {
                const itemId = req.params.id;
                const itemService = new items_services_1.ItemService(auth);
                const itemCheck = await itemService.checkItemId(itemId);
                if (itemCheck.length == 0) {
                    return res.status(404).send("item does not exist");
                }
                else {
                    const itemData = await itemService.getSingleItem(itemId);
                    if (itemData === items_services_1.ItemServiceStatus.UNABLE ||
                        itemData === items_services_1.ItemServiceStatus.FORBIDDEN ||
                        itemData === items_services_1.ItemServiceStatus.ERROR) {
                        if (itemData === items_services_1.ItemServiceStatus.FORBIDDEN) {
                            return res.status(403).send("forbidden");
                        }
                        return res.status(404).send("item does not exist or unable to access");
                    }
                    if (!itemData.userId) {
                        return res.status(404).send("item does not have a valid userId");
                    }
                    const deleteItem = await itemService.deleteItem(itemId, itemData.userId);
                    if (deleteItem == items_services_1.ItemServiceStatus.UNABLE || !deleteItem) {
                        return res.status(500).send("unable to delete task");
                    }
                    else if (deleteItem == items_services_1.ItemServiceStatus.FORBIDDEN) {
                        return res.status(403).send("forbidden");
                    }
                    else {
                        return res.status(202).send("successfully deleted task");
                    }
                }
            }
        }
    }
    createItem(req, res) {
        const tokenAuthentication = new token_services_1.TokenService();
        const authHeader = req.headers["authorization"];
        const accessToken = authHeader?.split(" ")[1];
        const auth = tokenAuthentication.tokenAuth(accessToken);
        if (auth == token_services_1.TokenStatus.ERROR) {
            return res.status(403).send("forbidden");
        }
        else {
            const task = req.body.task;
            const status = req.body.status;
            const itemService = new items_services_1.ItemService(auth);
            const createTask = itemService.newTask(auth.user._id, task, status);
            if (createTask == items_services_1.ItemServiceStatus.UNABLE) {
                return res.status(500).send("unable to create task");
            }
            else {
                return res.status(201).send("successfully created task");
            }
        }
    }
    async updateItem(req, res) {
        const tokenAuthentication = new token_services_1.TokenService();
        const authHeader = req.headers["authorization"];
        const accessToken = authHeader?.split(" ")[1];
        const auth = tokenAuthentication.tokenAuth(accessToken);
        const itemIdValidity = (0, mongoose_1.isValidObjectId)(req.params.id);
        if (itemIdValidity !== true) {
            return res.status(404).send("item not found");
        }
        else {
            if (auth == token_services_1.TokenStatus.ERROR) {
                return res.status(403).send("forbidden");
            }
            else {
                const itemId = req.params.id;
                const itemIdValidity = (0, mongoose_1.isValidObjectId)(itemId);
                if (itemIdValidity == true) {
                    const itemService = new items_services_1.ItemService(auth);
                    const itemCheck = await itemService.checkItemId(itemId);
                    if (itemCheck.length === 0) {
                        return res.status(404).send("item does not exist");
                    }
                    else {
                        const task = req.body.task;
                        const status = req.body.status;
                        const itemService = new items_services_1.ItemService(auth);
                        if (!task || status == (null)) {
                            return res.status(400).send("please enter all fields correctly");
                        }
                        else {
                            const checkItemUserId = await itemService.getSingleItem(itemId);
                            if (checkItemUserId == items_services_1.ItemServiceStatus.FORBIDDEN) {
                                return res.status(403).send("forbidden");
                            }
                            else {
                                const patchTask = await itemService.updateTask(checkItemUserId.userId, itemId, task, status);
                                if (patchTask == items_services_1.ItemServiceStatus.ERROR) {
                                    return res.status(400).send("failed to edit task");
                                }
                                else if (patchTask == items_services_1.ItemServiceStatus.FORBIDDEN) {
                                    return res.status(403).send("forbidden");
                                }
                                else {
                                    return res.send("successfully edited task");
                                }
                            }
                        }
                    }
                }
                else {
                    return res.status(404).send("item does not exist");
                }
            }
        }
    }
}
exports.todoController = todoController;
