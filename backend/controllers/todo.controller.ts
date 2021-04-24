import { Application, request, Request, Response } from "express"
import { TokenService } from "../services/token.services"
import { ItemServices } from "../services/items.services"


export class todoController{
    private app: Application

    constructor(app: Application){
        this.app = app
    }

    getItems(){
        const tokenAuthentication = new TokenService();
        this.app.get("/todo", async (req: Request, res: Response)=>{
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
        })
    }

    deleteItems(){
        const tokenAuthentication = new TokenService();
        this.app.delete("/todo/:id", async (req: Request, res: Response)=>{
            const authHeader = req.headers["authorization"]
            const accessToken = authHeader?.split(" ")[1]
            const auth = tokenAuthentication.tokenAuth(accessToken);
            if (auth == "forbidden"){
                return res.status(403).send("forbidden")
            }
            else{
                const itemId = req.params;
                const itemService = new ItemServices(auth);
                const deleteItem = await itemService.deleteItem(itemId.id);

            }
        })
    }

}