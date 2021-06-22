import e, { Application, request, Request, Response } from "express"
import { TokenService, TokenStatus } from "../services/token.services"
import { ItemService, ItemServiceStatus } from "../services/items.services"
import { isValidObjectId, Mongoose } from "mongoose"


export class todoController{
    private app: Application

    constructor(app: Application){
        this.app = app
    }

    async getItems(req: Request, res: Response){
        const tokenAuthentication = new TokenService();
            const authHeader = req.headers["authorization"]
            const accessToken = authHeader?.split(" ")[1]
            const auth = tokenAuthentication.tokenAuth(accessToken);
            if(auth == TokenStatus.ERROR){
                return res.status(403).send("forbidden")
            }else{
                const itemService = new ItemService(auth);
                const getItems = await itemService.getItemList();
                if(getItems === ItemServiceStatus.UNABLE){
                    return res.status(404).send("unable to get items")
                }
                else{
                    return res.send(getItems)
                }
            }
    }

    async deleteItems(req: Request, res: Response){
        const tokenAuthentication = new TokenService();
        const authHeader = req.headers["authorization"]
        const accessToken = authHeader?.split(" ")[1]
        const auth = tokenAuthentication.tokenAuth(accessToken);
        const itemIdValidity = isValidObjectId(req.params.id)
        if(itemIdValidity !== true){
            return res.status(404).send("item does not exist")
        }
        else{
            if (auth == TokenStatus.ERROR){
                return res.status(403).send("forbidden")
            }
            else{
                const itemId = req.params.id;
                const itemService = new ItemService(auth);
                    const itemCheck: any = await itemService.checkItemId(itemId)
                    if(itemCheck.length == 0){
                        return res.status(404).send("item does not exist")
                    }
                    else{
                        const itemData = await itemService.getSingleItem(itemId)
                        const deleteItem: any = await itemService.deleteItem(itemId, itemData.userId);
                        if (deleteItem == ItemServiceStatus.UNABLE || !deleteItem){
                            return res.status(500).send("unable to delete task")
                        }
                        else if(deleteItem == ItemServiceStatus.FORBIDDEN){
                            return res.status(403).send("forbidden")
                        }
                        else{
                            return res.status(202).send("successfully deleted task")
                        }
                    }
            }
        }
    }

    createItem(req: Request,  res: Response){
        const tokenAuthentication = new TokenService();
        const authHeader = req.headers["authorization"]
        const accessToken = authHeader?.split(" ")[1]
        const auth = tokenAuthentication.tokenAuth(accessToken);
        if (auth == TokenStatus.ERROR){
            return res.status(403).send("forbidden")
        }
        else{
            const task = req.body.task
            const status = req.body.status
            const itemService = new ItemService(auth);
            const createTask: any = itemService.newTask(auth.user._id, task, status)
            if(createTask == ItemServiceStatus.UNABLE){
                return res.status(500).send("unable to create task")
            }
            else{
                return res.status(201).send("successfully created task")
            }
        }
    }

    async updateItem(req: Request, res: Response){
        const tokenAuthentication = new TokenService();
        const authHeader = req.headers["authorization"]
        const accessToken = authHeader?.split(" ")[1]
        const auth = tokenAuthentication.tokenAuth(accessToken);
        const itemIdValidity = isValidObjectId(req.params.id)
        if(itemIdValidity !== true){
            return res.status(404).send("item not found")
        }
        else{
            if (auth == TokenStatus.ERROR){
                return res.status(403).send("forbidden")
            }
            else{
                const itemId = req.params.id;
                const itemIdValidity = isValidObjectId(itemId)
                if(itemIdValidity == true){
                    const itemService = new ItemService(auth);
                    const itemCheck: any = await itemService.checkItemId(itemId)
                    if(itemCheck.length === 0){
                        return res.status(404).send("item does not exist")
                    }
                    else{
                        const task = req.body.task
                        const status = req.body.status
                        const itemService = new ItemService(auth);
                        if(!task || status == (undefined || null)){
                            return res.status(400).send("please enter all fields correctly")
                        }
                        else{
                            const checkItemUserId: any = await itemService.getSingleItem(itemId)
                            if(checkItemUserId == ItemServiceStatus.FORBIDDEN){
                                return res.status(403).send("forbidden")
                            }
                            else{
                                const patchTask: any = await itemService.updateTask(checkItemUserId.userId, itemId, task, status)
                                if(patchTask == ItemServiceStatus.ERROR){
                                    return res.status(400).send("failed to edit task")
                                }
                                else if(patchTask == ItemServiceStatus.FORBIDDEN){
                                    return res.status(403).send("forbidden")
                                }
                                else{
                                    return res.send("successfully edited task")
                                }
                            }
                        }
                    }
                }
                else{
                    return res.status(404).send("item does not exist")
                }
            }
        }
    }

}