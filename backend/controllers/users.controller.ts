
import express, { Application, json, request, Request, Response } from "express"
import { Users } from "../models/users.model";
import { passwordService } from "../services/password.services";
import { userServices } from "../services/user.services"
import { tokenService } from "../services/token.services"

export class userController{
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
        this.app.post("/users/signup", async (req: Request, res: Response)=>{
            const userEmail = req.body.email
            const userPassword = req.body.password
            const userService = new userServices(userEmail, userPassword)
            const createUser = await userService.createUser();
            res.send(createUser)
        })
    }

    logIn(){
        this.app.post("/users/login", async (req: Request, res: Response)=>{
            const userEmail = req.body.email
            const userPassword = req.body.password
            const userService = new userServices(userEmail, userPassword)
            const loginUser = await userService.userLogin();
            res.send(loginUser)
        })
    }

    refreshToken(){
        this.app.post("/newAccessToken", async (req: Request, res: Response)=>{
            const user = new userServices(req.body.email, req.body.password)
            const findUser = await user.findUser()

            const authHeader = req.headers["authorization"]
            const refreshToken = authHeader?.split(" ")[1]
            const refreshTokenService = new tokenService();
            const refreshAccess = refreshTokenService.refreshAccessToken(refreshToken, findUser)
            res.send(refreshAccess)

        })
    }
}