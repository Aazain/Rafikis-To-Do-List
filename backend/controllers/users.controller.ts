
import express, { Application, json, request, Request, Response } from "express"
import { Users } from "../models/users.model";
const app:Application = express();

class Express{
    private app: Application = express();
    
    constructor(app: Application){
        app = app;
    }

    getUsers() {
        app.get("/users", (req: Request, res: Response) => {
            console.log("nice")
            Users.find({}, (err, foundData) => {
                if (err) {
                    res.status(404).send("Unable to find Users")
                } else {
                    res.send([...foundData])
                }
            })
        })
    }

    signUp(){
        app.post("/users/signup", (req: Request, res: Response)=>{
           console.log(req.body)
        })
    }

}