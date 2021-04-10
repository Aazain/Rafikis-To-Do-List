
import express, { Application, json, request, Request, Response } from "express"
import { Users } from "../models/users.model";
import { userServices } from "../services/user.services"

export class Express{
    private app: Application;
    
    constructor(app: Application){
        this.app = app;
    }

    getUsers() {
        this.app.get("/users", (req: Request, res: Response) => {
            Users.find({}, (err, foundData) => {
                if (err) {
                    return res.status(404).send("Unable to find Users")
                } else {
                    return res.send([...foundData])
                }
            })
        })
    }

    signUp(){
        this.app.post("/users/signup", (req: Request, res: Response)=>{
            const userEmail = req.body.email
            const userPassword = req.body.password
            const userService = new userServices(userEmail, userPassword)
            const createUser = userService.signUpUser();
        })
    }

}