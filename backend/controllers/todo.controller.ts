import e, { Application, request, Request, Response } from "express"
import { TokenService } from "../services/token.services"
import { ItemServices } from "../services/items.services"
import { Items } from "../models/todo.model"
import { userList } from "../services/userlist.services"
import { UserServices } from "../services/user.services"


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
        if(auth == "forbidden"){
            return res.status(403).send("forbidden")
        }
        else{
            const itemId = req.params.id
            const itemService = new ItemServices(auth)
            const getItem: any = await itemService.getSingleItem(itemId)
            if(getItem == "unable to find item" || !getItem){
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
            if(auth == "forbidden"){
                return res.status(403).send(auth)
            }else{
                const itemService = new ItemServices(auth);
                const getItems = await itemService.getItemList();
                if(getItems == "unable to get Items"){
                    return res.status(404).send(getItems)
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
            if (auth == "forbidden"){
                return res.status(403).send("forbidden")
            }
            else{
                const itemId = req.params.id;
                const itemService = new ItemServices(auth);
                const itemCheck: any = await itemService.checkItemId(itemId)
                if(itemCheck.length === 0){
                    return res.status(404).send("item does not exist")
                }
                else{
                    const deleteItem = await itemService.deleteItem(itemId);
                    if (deleteItem == "unable to delete task" || !deleteItem){
                        console.log(deleteItem, !deleteItem)
                        return res.status(500).send("unable to delete task")
                    }
                    else{
                        return res.status(202).send("successfully deleted task ")
                    }
                }
            }
    }

    async createItem(req: Request,  res: Response){
        const tokenAuthentication = new TokenService();
        const authHeader = req.headers["authorization"]
        const accessToken = authHeader?.split(" ")[1]
        const auth = tokenAuthentication.tokenAuth(accessToken);
        if (auth == "forbidden"){
            return res.status(403).send("forbidden")
        }
        else{
            const task = req.body.task
            const status = req.body.status
            const itemService = new ItemServices(auth);
            const createTask: any = itemService.newTask(auth.user._id, task, status)
            if(createTask == "unable to create task"){
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
        if (auth == "forbidden"){
            return res.status(403).send("forbidden")
        }
        else{
            const itemId = req.params.id;
            const itemService = new ItemServices(auth);
            const itemCheck: any = await itemService.checkItemId(itemId)
            if(itemCheck.length === 0){
                return res.status(404).send("item does not exist")
            }
            else{
                const task = req.body.task
                const status = req.body.status
                const itemService = new ItemServices(auth);
                const patchTask = itemService.updateTask(auth.user._id, itemId, task, status)
            }
        }
    }

}