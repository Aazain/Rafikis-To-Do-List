
import express, { Application, json, request, Request, Response } from "express"
import { UserServices } from "../services/user.services"
import { TokenService } from "../services/token.services"
import { userList } from "../services/userlist.services"

export class userController{
    private app: Application;
    
    constructor(app: Application){
        this.app = app;
    }

    async getUsers(req: Request, res: Response) {
            const users = new userList();
            const getAllUsers = await users.getUserList()
            if(getAllUsers == null){
                return res.status(404).send("Unable to find Users")
            }else{
                res.send(getAllUsers)
            }
    }

    async signUp(req: Request, res: Response){
            const userEmail = req.body.email
            const userPassword = req.body.password
            const userService = new UserServices(userEmail, userPassword)
            const createUser = await userService.createUser();
            if(createUser == "a user with this email already exists"){
                return res.status(409).send(createUser)
            }else{
                return res.status(201).send(createUser)
            }
    }

    async logIn(req: Request, res: Response){
            const userEmail = req.body.email
            const userPassword = req.body.password
            const userService = new UserServices(userEmail, userPassword)
            const loginUser = await userService.userLogin();
            if(loginUser == "incorrect email or password"){
                res.status(403).send(loginUser)
            }
            else{
                return res.status(200).send(loginUser)
            }
    }

    async refreshToken(req: Request, res: Response){
            const user = new UserServices(req.body.email, req.body.password)
            const findUser = await user.findUser()
            const authHeader = req.headers["authorization"]
            const refreshToken = authHeader?.split(" ")[1]
            const refreshTokenService = new TokenService();
            const refreshAccess = refreshTokenService.refreshAccessToken(refreshToken, findUser)
            if(refreshAccess == "invalid token"){
                res.status(400).send(refreshAccess)
            }
            else{
                res.status(200).send(refreshAccess)
            }
    }
}