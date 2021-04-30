import e, { Application, request, Request, Response } from "express"
import { TokenService, TokenStatus } from "../services/token.services"
import { ItemService, ItemServiceStatus } from "../services/items.services"
import { isValidObjectId, Mongoose } from "mongoose"


export class todoController{
    private app: Application

    constructor(app: Application){
        this.app = app
    }

    async getSingleItem(req: Request, res: Response){
        const tokenAuthentication = new TokenService()
        const authHeader = req.headers["authorization"]
        const accessToken = authHeader?.split(" ")[1]
        const auth = tokenAuthentication.tokenAuth(accessToken);
        if(auth == TokenStatus.ERROR){
            return res.status(403).send("forbidden")
        }
        else{
            const itemId = req.params.id
            const itemService = new ItemService(auth)
            const getItem: any = await itemService.getSingleItem(itemId)
            if(getItem == ItemServiceStatus.UNABLE || !getItem){
                return res.status(404).send("unable to find item")
            }
            else{
                return res.status(200).send(getItem)
            }
        }
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
        if (auth == TokenStatus.ERROR){
            return res.status(403).send("forbidden")
        }
        else{
            const itemId = req.params.id;
            const itemService = new ItemService(auth);
            const itemIdValidity = isValidObjectId(itemId) 
            if(itemIdValidity == true){
                const itemCheck: any = await itemService.checkItemId(itemId)
                if(itemCheck.length === 0 || itemCheck === ItemServiceStatus.ERROR){
                    return res.status(404).send("item does not exist")
                }
                else{
                    const deleteItem = await itemService.deleteItem(itemId);
                    if (deleteItem == ItemServiceStatus.UNABLE || !deleteItem){
                        return res.status(500).send("unable to delete task")
                    }
                    else{
                        return res.status(202).send("successfully deleted task ")
                    }
                }
            }
            else{
                return res.status(404).send("item does not exist")
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
                    const patchTask = await itemService.updateTask(auth.user._id, itemId, task, status)
                    if(patchTask == ItemServiceStatus.ERROR){
                        return res.status(400).send("failed to edit task")
                    }
                    else{
                        return res.send("successfully edited task")
                    }
                }
            }
            else{
                return res.status(404).send("item does not exist")
            }
        }
    }

}